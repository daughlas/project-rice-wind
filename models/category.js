const { Http } = require("../utils/http");

class Category {

  static async getHomeLocationC() {
    return await Http.request({
      url: `/v1/category/grid/all`
    })
  }

}

export {
  Category
}