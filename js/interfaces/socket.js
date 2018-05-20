/**
 * socket 操作
 * 单例对象
 */
let instance = false

export default class Socket {
  constructor() {
    if ( instance ) {
      return instance
    }
    instance = this

    this.isOpen = false
  }
  // 开启socket
  // 每新开一局，都要这样开启一次
  open() {
    wx.connectSocket({
      url: `wss://wx.idsbllp.cn/StrongBox/websocket/${dataBus.userData.openid}`,
      header: {},
      protocols: []
    })
    // 是否连接上
    wx.onSocketOpen(() => {
      console.log('Socket已连接')
      this.isOpen = true

      this.pingSet()
    })
  }
  //发心跳包
  ping() {
    if (!this.isOpen)
      return console.log('socket ping出错：尚未连接')
    
    wx.sendSocketMessage({
      data: JSON.stringify({
        type: 'ping',
        num: 0
      }),
      fail (err) {
        console.log('ping失败', err)
      }
    })
  }
  // 心跳真正跳起来
  pingSet() {
    setTimeout(() => {
      this.ping()
      if (this.isOpen)
        this.pingSet()
    })
  }




}