import { FenceCellStatus } from '../../core/enum'

class FenceCell {
  title
  id
  status = FenceCellStatus.WAITING
  spec

  constructor(spec) {
    this.spec = spec
    this.title = spec.value
    this.id = spec.value_id
  }

  getFenceCellCode() {
    return this.spec.key_id + '-' + this.spec.value_id
  }
}

export {
  FenceCell
}
