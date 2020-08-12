import { FenceGroup } from "../models/fence-group"
import { Judger } from '../models/judger'

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    previewImg: String,
    title: String,
    price: String,
    discountPrice: String,
    stock: Number
  },
  /**
   * observer
   */
  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      //TODO 删除掉
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)

      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindInitData(fenceGroup)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },
    bindInitData (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },
    onCellTap(event) {
      const { cell, x, y } = event.detail
      const judger = this.data.judger
      judger.judge(cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }

  },
  /**
   * 自定义组件的生命周期函数
   */
  lifetimes: {
    attached () {

    },
    ready () {

    },
    create () {

    }
  }
})
