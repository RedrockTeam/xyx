import { API_PORT } from '../configs/options.js'

const GetInfo = function (cb) {
  wx.request({
    url: `${API_PORT}/StrongBox/user/info`,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      // 'openid': dataBus.userData.openid
      'openid': 123
    },
    success(res) {
      console.log(res)
      cb(res.data)
    },
    fail (err) {
      throw new Error('?')
    }
  })
}

export default GetInfo