import { FenceGroup } from "../models/fence-group"
import { Judger } from '../models/judger'
import { Spu } from "../../models/spu";
import { FenceCell } from "../models/fence-cell";

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
    stock: Number,
    noSpec: Boolean,
    skuIntact: Boolean,
    tip: String,
    currentValues: String,
    missingKeys: String
  },
  /**
   * observer
   */
  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec: true
      })
      this.bindSkuData(spu.sku_list[0])
    },
    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.data.judger = new Judger(fenceGroup)

      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },
    bindTipData() {
      this.setData({
        skuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValue().join('、'),
        missingKeys: this.data.judger.getMissingKeys().join('、')
      })
    },
    bindFenceGroupData (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      })
    },
    onCellTap(event) {
      // 更新规格联动
      const data = event.detail
      const x = data.x
      const y = data.y
      // 将 event 返回的对象变回我们的模型对象
      let cell = new FenceCell(data.cell.spec)
      cell.status = data.cell.status
      const judger = this.data.judger
      judger.judge(cell, x, y)
      this.bindFenceGroupData(judger.fenceGroup)
      // 更新图片、价格请选择
      // 1. 没有确定 SKU
      // 2. 确定了 SKU
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku();
        this.bindSkuData(currentSku)
      }
      this.bindTipData()
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
