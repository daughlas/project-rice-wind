import { Matrix } from "./matrix"
import { Fence } from "./fence"

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  initFencesOld() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1
    // 矩阵循环的方式
    // 不易懂，废弃
    matrix.each((element, i, j) => {
      if (currentJ !== j) {
        // 开启新的一列，需要创建一个新的 Fence
        currentJ = j
        fences[currentJ] = this._createFence()
      }
      // createFence
      // 这是一句臭代码，如果修改代码，就要一直这样操作对象
      // 伪面向对象
      fences[currentJ].pushValueTitle(element.value)
    })
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const martrixT = matrix.transpose()
    martrixT.forEach( row => {
      const fence = new Fence(row)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
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