import { SkuCode } from './sku-code'
import {FenceCellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

  fenceGroup
  pathDict = []
  currentCell
  skuPending


  constructor (fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initSkuPending()
    this._initPathDict()
  }

  _initSkuPending () {
    this.skuPending = new SkuPending()
  }

  _initPathDict () {
    this.fenceGroup.spu.sku_list.forEach(sku => {
      // sku.code
      const skuCode = new SkuCode(sku.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSegments)
    })
  }

  judge (cell, x, y) {
    this.currentCell = { cell, x, y }
    this._changeCurrentCellStatus(cell, x, y)
    this.fenceGroup.eachCell(this._changeOtherCellCellStatus)
  }

  _changeOtherCellCellStatus = (cell, x, y) => {
    // 潜在路径
    const path = this._findPotentialPath(cell, x, y)
    // console.log(path)
    if (!path) {
      return
    }
    const isIn = this._isInDict(path)
    if (isIn) {
      this.fenceGroup.fences[x].cells[y].status = FenceCellStatus.WAITING
    } else {
      this.fenceGroup.fences[x].cells[y].status = FenceCellStatus.FORBIDDEN
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

  _changeCurrentCellStatus(cell, x, y) {
    const target = this.fenceGroup.fences[x].cells[y]
    if (cell.status === FenceCellStatus.WAITING) {
      target.status = FenceCellStatus.SELECTED
      this.skuPending.insertCell(cell, x)
    }
    if (cell.status === FenceCellStatus.SELECTED) {
      target.status = FenceCellStatus.WAITING
      this.skuPending.removeCell(x)
    }
  }
}

export {
  Judger
}
