import { FenceCell } from './fence-cell'
class SkuPending {
    pending = []

    constructor () {

    }

    init(sku) {
        sku.specs.forEach((spec,i) => {
            const cell = new FenceCell(spec)
            this.insertCell(cell, i)
        })
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell){
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}
