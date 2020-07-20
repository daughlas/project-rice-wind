// 业务对象
// 一定要定义好业务对象

import { Http } from "../utils/http"

class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  // 合并请求一次获取所有数据
  static async getHomeLocationA() {
    return await Http.request({
      url: `/v1/theme/by/names`,
      data: {names: Theme.locationA},
    })
  }

  static async getHomeLocationE() {
    return await Http.request({
      url: `/v1/theme/by/names`,
      data: {names: 't-1'},
    })
  }
}

export {
  Theme
}