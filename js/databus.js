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
    this.score = 0
    // fix进度条
    this.fixDenominator = 1000
    this.fixNumerator = 0

    this.paused = false

    this.sightNumber = 0

    this.hourglassNumber = 0
  }
}