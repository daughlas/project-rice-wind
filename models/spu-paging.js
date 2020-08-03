const { Paging } = require("../utils/paging");

class SpuPaging {
  static getLatestPaging() {
    return new Paging({
      url: `/v1/spu/latest`
    }, 5, 0)
  }
}

export {
  SpuPaging
}