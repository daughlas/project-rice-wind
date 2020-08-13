import { SkuCode } from './sku-code'
import {FenceCellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

  fenceGroup
  pathDict = []
  skuPending


  constructor (fenceGroup) {
    this.fenceGroup = fenceGroup
    // 先初始化 path Dict 保存所有可能路径
    this._initPathDict()
    this._initSkuPending()
  }

  _initSkuPending () {
    const specsLength = this.fenceGroup.fences.length
    this.skuPending = new SkuPending(specsLength)

    const defaultSku = this.fenceGroup.getDefaultSku()
    if (!defaultSku) {
      return
    }
    this.skuPending.init(defaultSku)
    this._initSelectedCell(defaultSku)
  }

  _initSelectedCell() {
    this.skuPending.pending.forEach(cell => {
      this.fenceGroup.setCellStatusById(cell.id, FenceCellStatus.SELECTED)
    })
    this.judge(null, null, null, true)
  }


  _initPathDict () {
    this.fenceGroup.spu.sku_list.forEach(sku => {
      // sku.code
      const skuCode = new SkuCode(sku.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSegments)
    })
  }

  isSkuIntact() {
    return this.skuPending.isIntact()
  }

  getMissingKeys() {
    const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
    return missingKeysIndex.map(i => this.fenceGroup.getTitleByIndex(i))
  }

  getCurrentValue() {
    return this.skuPending.getCurrentSpecValues()
  }

  judge (cell, x, y, isInit = false) {
    if (!isInit) {
      this._changeCurrentCellStatus(cell, x, y)
    }
    this.fenceGroup.eachCell(this._changeOtherCellCellStatus)
  }

  _changeOtherCellCellStatus = (cell, x, y) => {
    // 潜在路径
    const path = this._findPotentialPath(cell, x, y)
    if (!path) {
      // 这种情况是当前行选中的这一个
      return
    }
    const isIn = this._isInDict(path)
    if (isIn) {
      this.fenceGroup.setCellStatusByXY(x, y, FenceCellStatus.WAITING)
    } else {
      this.fenceGroup.setCellStatusByXY(x, y, FenceCellStatus.FORBIDDEN)
    }
  }

  _isInDict(path) {
    return this.pathDict.includes(path)
  }

  _findPotentialPath (cell, x, y) {
    const joiner = new Joiner('#')
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      // TODO
      const selected = this.skuPending.findSelectedCellByX(i)
      if (x === i) {
        // 当前行
        if (this.skuPending.isSelected(cell, x)) {
          return
        }
        // 不能使用 const cellCode = cell.getCode
        const cellCode = this._getCellCode(cell.spec)
        joiner.join(cellCode)
      } else {
        // 非当前行
        if(selected) {
          // 并且有一个已选元素
          const selectedCellCode = this._getCellCode(selected.spec)
          joiner.join(selectedCellCode)
        }
      }
    }
    return joiner.getStr()
  }

  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }

  getDeterminateSku() {
    const code  = this.skuPending.getSkuCode()
    const sku = this.fenceGroup.getSku(code)
    return sku
  }

  _changeCurrentCellStatus(cell, x, y) {
    if (cell.status === FenceCellStatus.WAITING) {
      this.fenceGroup.setCellStatusByXY(x, y, FenceCellStatus.SELECTED)
      this.skuPending.insertCell(cell, x)
    }
    if (cell.status === FenceCellStatus.SELECTED) {
      this.fenceGroup.setCellStatusByXY(x, y, FenceCellStatus.WAITING)
      this.skuPending.removeCell(x)
    }
  }
}

export {
  Judger
}
