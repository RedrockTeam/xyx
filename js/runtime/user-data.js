import { API_PORT, OPENID_PATH } from '../configs/options'

export default function userData () {
  // 获取用户信息，头像之类的
  wx.getUserInfo({
    success (res) {
      dataBus.userInfo = res.userInfo
    }
  })

  // 登陆，获取openID
  wx.login({
    success (res) {
      wx.request({
        url: `${API_PORT}/${OPENID_PATH}`,
        data: {
          code: res.code
        },
        success (res) {
          dataBus.userData.openid = res.openid
          dataBus.userData.session_key = res.session_key
          // 此处刷新storage里的openid值
          // 因为并不会影响到游戏进程，所以采用异步的方式
          wx.setStorage({
            key: 'openid',
            data: res.openid
          })
        }
      })
    }
  })

  wx.showShareMenu({
    withShareTicket: false
  })

  wx.onShareAppMessage(console.log)
}
