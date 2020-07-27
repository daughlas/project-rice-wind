// 业务对象
// 一定要定义好业务对象
import { Http } from "../utils/http"

class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    this.themes = await Http.request({
      url: `/v1/theme/by/names`,
      data: {
        names
      }
    })
  }

  // 合并请求一次获取所有数据
  async getHomeLocationA() {
    return this.themes.find(t => t.name === Theme.locationA)
  }

  async getHomeLocationE() {
    return this.themes.find(t => t.name === Theme.locationE)
  }
}

export {
  Theme
}