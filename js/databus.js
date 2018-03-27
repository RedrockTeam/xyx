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

    this.frame = 0
    this.score = 0
    this.paused = false
  }
}