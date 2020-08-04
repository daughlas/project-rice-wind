import { FenceCell } from "./fence-cell"

class Fence {
  cells = []
  specs
  title
  titleId

  constructor(specs) {
    this.specs= specs
    this.title = specs[0].key
    this.titleId = specs[0].key_id
  }

  init() {
    this._initCells()
  }

  _initCells() {
    this.specs.forEach(spec => {
      // spec 规格
      const existed = this.cells.some(c => {
        return c.id === spec.value_id
      })
      if (existed) {
        return
      }
      const cell = new FenceCell(spec)
      this.cells.push(cell)
    })
  }
}

export {
  Fence
}