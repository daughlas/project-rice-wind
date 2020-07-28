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

  

  // 先使用一个通用的，下面再写一个具体的
  static getThemeSpuByName(name) {
    return Http.request({
      url: `/v1/theme/name/${name}/with_spu`
    })
  }

  // 上面那个是具体
  static getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE)
  }
}

export {
  Theme
}