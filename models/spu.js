const { Http } = require("../utils/http");

const model =  {
  "id": 4,
  "title": "印花桌布",
  "subtitle": "生活需要仪式感，吃饭也一样。桌旗+桌布给你绚烂的生命色彩",
  "category_id": 26,
  "root_category_id": 27,
  "price": "119.00",
  "img": "http://i2.sleeve.7yue.pro/n10.png",
  "for_theme_img": "",
  "description": null,
  "discount_price": "97.00",
  "tags": "风袖臻选",
  "is_test": true,
  "online": true,
  "sku_list": [
    {
      "id": 10,
      "price": 78.00,
      "discount_price": null,
      "online": true,
      "img": "http://i2.sleeve.7yue.pro/n10.png",
      "title": "桌旗 130 cm",
      "spu_id": 4,
      "category_id": 26,
      "root_category_id": 27,
      "specs": [
        {
          "key_id": 5,
          "key": "颜色规格",
          "value_id": 20,
          "value": "桌旗 30x 100 cm"
        }
      ],
      "code": "4$5-20",
      "stock": 664
    },
    {
      "id": 11,
      "price": 128.00,
      "discount_price": null,
      "online": true,
      "img": "http://i2.sleeve.7yue.pro/n10.png",
      "title": "桌布 140x 360 cm",
      "spu_id": 4,
      "category_id": 26,
      "root_category_id": 27,
      "specs": [{
        "key_id": 5,
        "key": "颜色规格",
        "value_id": 21,
        "value": "桌布 140x 360 cm"
      }],
      "code": "4$5-21",
      "stock": 555
    },
    {
      "id": 12,
      "price": 72.00,
      "discount_price": null,
      "online": true,
      "img": "http://i2.sleeve.7yue.pro/n10.png",
      "title": "桌旗 30x 220 cm",
      "spu_id": 4,
      "category_id": 26,
      "root_category_id": 27,
      "specs": [{
        "key_id": 5,
        "key": "颜色规格",
        "value_id": 22,
        "value": "桌旗 30x 220 cm"
      }],
      "code": "4$5-22",
      "stock": 556
    },
    {
      "id": 13,
      "price": 188.00,
      "discount_price": null,
      "online": true,
      "img": "http://i2.sleeve.7yue.pro/n10.png",
      "title": "桌布 160x 330 cm",
      "spu_id": 4,
      "category_id": 26,
      "root_category_id": 27,
      "specs": [{
        "key_id": 5,
        "key": "颜色规格",
        "value_id": 23,
        "value": "桌布 160x 330 cm"
      }],
      "code": "4$5-23",
      "stock": 547
    }],
  "spu_img_list": [{
    "id": 126,
    "img": "http://i2.sleeve.7yue.pro/n10.png",
    "spu_id": 4
  }],
  "spu_detail_img_list": [],
  "sketch_spec_id": 5,
  "default_sku_id": null
}

class Spu {
  static getDetail(id) {
    return Http.request({
      url: `/v1/spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}
