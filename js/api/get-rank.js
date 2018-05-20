import { API_PORT } from '../configs/options.js'

const getRank = function (cb) {
  wx.request({
    url: `${API_PORT}/StrongBox/user/rank`,
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

export default getRank