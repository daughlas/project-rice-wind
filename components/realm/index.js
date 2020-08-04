const { FenceGroup } = require("../models/fence-group")

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

  },

  /**
   * 组件的方法列表
   */
  methods: {

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
    }
  }
})
