import { Matrix } from "./matrix"
import { Fence } from "./fence"

class FenceGroup {
  spu
  skuList = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1
    matrix.forEach((element, i, j) => {
      if (currentJ !== j) {
        // 开启新的一列，需要创建一个新的 Fence
        currentJ = j
        fences[currentJ] = this._createFence()
      }
      // createFence
      fences[currentJ].pushValueTitle(element.value)
    })
  }

  _createFence() {
    const fence = new Fence()
    return fence
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }
}

export {
  FenceGroup
}