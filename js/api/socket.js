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
    this.__socket = wx.connectSocket({
      url: `wss://wx.idsbllp.cn/StrongBox/websocket/${dataBus.userData.openid}`,
      header: {},
      protocols: []
    })
    // 是否连接上
    this.__socket.onOpen(() => {
      console.log('Socket已连接')
      this.isOpen = true

      this.pingSet()
    })
  }
  //发心跳包
  ping() {
    if (!this.isOpen)
      return console.log('socket ping出错：尚未连接')
    
    this.__socket.send({
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
    }, 1000)
  }

  pushScore() {
    this.__socket.send({
      data: JSON.stringify({
        type: 'score',
        num: dataBus.score
      }),
      fail (err) {
        console.log('ping失败', err)
      }
    })
  }

  pushItem(arg) {
    this.__socket.send({
      data: JSON.stringify({
        type: 'property' + arg,
        num: 0
      }),
      fail (err) {
        console.log('道具消耗失败', err)
      }
    })
  }

  close() {
    this.__socket.close()
  }
}