let instance

export default class DataBus {
  constructor () {
    // 如果创建过DataBus了，就返回之前创造的
    if (instance) { return instance }

    instance = this

    this.init()
  }

  init () {
    this.height = 0

    this.frame = 0
    // 分数
    this.score = 0
    // fix进度条
    this.fixDenominator = 5
    this.fixNumerator = 0

    this.isPaused = false

    this.sightNumber = 0
    // 水的高度
    this.waterPercent = 0

    this.hourglassNumber = 0

    this.boxList = []
    this.boxList.dropStartY = 0.5 * screenHeight

    /**
     * 用户数据存的对象
     * openid要进行初始化，这样子做的好处是用户以后再打开游戏的时候，openid会一直存在
     */
    this.userData = { openid: wx.getStorageSync('openid') || void 0 }

    wx.getSystemInfo({
      success: (res) => {
        this.systemInfo = res
      }
    })
    /**
     * 游戏状态
     * 改变状态是直接改变这个字符串，会自动检测并调用相应的渲染函数
     * @type {String}
     */
    this.gameStatus = 'playing'

    this.userInfo = {}
    // 当前最上面的盒子的偏移量
    this.boxPoint = 0

    this.gameControl = {
      isNeedRefreshPlaying: true
    }
  }
}
