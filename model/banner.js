const { Http } = require("../utils/http");

class Banner {
  static locationB = 'b-1'

  static async getHomeLocationB() {
    return await Http.request({
      url: `/v1/banner/name/${Banner.locationB}`
    })
  }
}

export {
  Banner
}