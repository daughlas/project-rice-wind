const { config } = require("../config/config");

class Http {
  static async request({url, data, method='GET'}) {
    const res = await promisic(wx.request)({
      url: config.apiBaseUrl + url,
      data,
      method,
      header: {
        appKey: config.appKey
      }
    })
    return res.data
  }
}

const promisic = function (func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export {
  Http
}