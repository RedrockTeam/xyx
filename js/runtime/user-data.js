import { API_PORT, OPENID_PATH } from '../configs/options'
import { getInfo } from '../api/index.js'

export default function userData() {
  // 获取用户信息，头像之类的
  wx.getUserInfo({
    success(res) {
      dataBus.userInfo = res.userInfo
    }
  })

  // 登陆，获取openID
  wx.login({
    success(res) {
      console.log(res)
      wx.request({
        url: `${API_PORT}${OPENID_PATH}`,
        data: {
          code: res.code
        },
        fail(err) {
          console.log('12321312312312312312', err)
        },
        success(res) {
          dataBus.userData.openid = res.data.openid
          dataBus.userData.session_key = res.data.session_key
          // 此处刷新storage里的openid值
          // 因为并不会影响到游戏进程，所以采用异步的方式
          console.log(res)
          wx.setStorageSync('openid', res.data.openid)
          dataBus.userData.openid = res.data.openid

          // wx.setUserCloudStorage({
          //   KVDataList: [{
          //     key: 'aaa',
          //     value: "{\"wxgame\":{\"score\":16,\"update_time\": 1513080573},\"cost_ms\":36500}"
          //   }],
          //   success() {
          //     console.log('dfaf')
          //   }
          // })

          getInfo(res => {
            console.log(res)
            if (res.status + '' !== '200') return console.error('?')
            // item1是瞄准镜，item2是沙漏
            dataBus.sightNumber = res.data.item1
            dataBus.hourglassNumber = res.data.item2
            dataBus.userData.highestScore = res.data.highestScore || 0
            dataBus.userData.id = res.data.id
            // 修 bug
            if (dataBus.userData.highestScore === 0) {
              setInterval(() => {
                getInfo(res => {
                  dataBus.userData.highestScore = res.data.highestScore || 0
                })
              }, 5000)
            }
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
