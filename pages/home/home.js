// pages/home/home.js
const { Theme } = require("../../model/theme.js")
const { Banner } = require("../../model/banner.js")
const { Category } = require("../../model/category.js")
const { Activity } = require("../../model/activity.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    themeE: null,
    themeESpu: [],
    grid: [],
    activityD: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad () {
    this.initAllData()
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = await theme.getHomeLocationA()
    const themeE = await theme.getHomeLocationE()
    let themeESpu = []
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeESpu = data.spu_list.slice(0, 8)
      }
    }

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    // 保存数据 类的对象 本身就具有保存数据的功能

    this.setData({
      themeA,
      themeE,
      themeESpu,
      bannerB,
      grid,
      activityD
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})