// components/fence-cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number
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
    onTap(event) {
      this.triggerEvent('celltap', {
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, { // 传递第三个参数的方法
        bubbles: true, // 开启冒泡
        composed: true // 跨越组件的边界
      })
    }
  }
})
