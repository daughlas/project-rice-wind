import { FenceCell } from './fence-cell'
class SkuPending {
    pending = []
    size

    constructor (size) {
        this.size = size
    }

    init(sku) {
        sku.specs.forEach((spec,i) => {
            const cell = new FenceCell(spec)
            this.insertCell(cell, i)
        })
    }

    getCurrentSpecValues() {
        // 模型类不要转化 UI 的东西
        // let str = this.pending.filter(cell => cell).map(cell => cell.title).join('、')
        const values = this.pending.map(cell => cell ? cell.title : null)
        return values
    }

    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    // 是否确认了完整的 SKU
    isIntact() {
        if (this.size !== this.pending.length) {
            return false
        }
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return this.pending[index] ? false : true
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

    getSkuCode() {
        return this.pending.map(cell => cell.getFenceCellCode()).join('#')
    }
}

export {
    SkuPending
}
