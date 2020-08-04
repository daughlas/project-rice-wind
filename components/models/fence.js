import { FenceCell } from "./fence-cell"

class Fence {
  cells = []
  specs

  constructor(specs) {
    this.specs= specs
  }

  init() {
    this.specs.forEach(spec => {
      // s 规格
      const cell = new FenceCell(spec)
      this.cells.push(cell)
    })
  }
}

export {
  Fence
}