let instance

export default class DataBus {
  constructor() {
    // 如果创建过DataBus了，就返回之前创造的
    if (instance)
      return instance

    instance = this

    this.init()

  }

  init() {
    this.height = 0

    this.frame = 0
    // 分数
    this.score = 10
    // fix进度条
    this.fixDenominator = 1000
    this.fixNumerator = 0

    this.isPaused = false

    this.sightNumber = 0

    this.hourglassNumber = 0

    this.boxList = []
    /**
     * 游戏状态
     * 改变状态是直接改变这个字符串，会自动检测并调用相应的渲染函数
     * @type {String}
     */
    this.gameStatus = 'clover'

    this.userInfo = {}
    // 当前最上面的盒子的偏移量
    this.boxPoint = 0
  }
}