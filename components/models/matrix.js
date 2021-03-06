class Matrix {
  m

  constructor(matrix) {
    this.m = matrix
  }

  get rowsNum() {
    return this.m.length
  }

  get colsNum() {
    return this.m[0].length
  }

  // 循环矩阵，先列后行
  each(cb) {
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowsNum; i++) {
        const element = this.m[i][j]
        cb(element, i, j)
      }
    }
  }

  transpose() {
    const destArr = []
    for(let j = 0; j < this.colsNum; j++) {
      destArr[j] = []
      for(let i = 0; i < this.rowsNum; i++) {
        destArr[j][i] = this.m[i][j]
      }
    }
    return destArr
  }
}

export {
  Matrix
}