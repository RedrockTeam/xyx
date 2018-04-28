const __ = {
  poolDic: Symbol('poolDic')
}
/**
 * 模仿官方demo写的对象池超高端代码
 */
export default class Pool {
  constructor () {
    this[__.poolDic] = {}
  }

  getObjBySign (name) {
    return this[__.poolDic].name || (this[__.poolDic].name = [])
  }

  getItemByClass (name, className) {
    let pool = this.getObjBySign(name)

    res = (pool.length
      ? pool.shift()
      : new className())

    return res
  }
  /**
   * 找到对象种类为name的一个数组，然后push进去
   */
  recover (name, instance) {
    this.getObjBySign(name).push(instance)
  }
}
