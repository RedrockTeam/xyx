// const aniFuncPath = 'ani-function/'

import * as func from '../configs/ani-function.js'

/**
 * 动画class
 * @param  {[Object]} bindStartObject  绑定的其实对象
 * @param  {[String]} bindStartProper  绑定的起始属性名
 * @param  {[Object]} bindTargetObject 绑定的目标对象
 * @param  {[String]} bindTargetProper 绑定的目标对象名
 * @param  {[Number]} frameNum 动画需要的帧数
 * @param  {[String]} aniFuncName 动画函数名
 */
export default class Animation {
  constructor(bindStartObject, 
              bindStartProper, 
              bindTargetObject, 
              bindTargetProper,
              frameNum = 0,
              aniFuncName = 'linear' ) {

    // 如果不需要动画，就是简单的绑定一下
    // 就调用双向绑定的函数绑定即可
    if (this.frameNum === 0)
      return twoWayBinding(this.TO, this.TP, this.LO, this.LP)
    
    this.prevData = 0
    this.changedData = 0

    this.frameNum = frameNum
    this.nowFrame = frameNum

    this.LO = bindStartObject
    this.LP = bindStartProper
    this.TO = bindTargetObject
    this.TP = bindTargetProper

    this.aniFunc = func[aniFuncName] || func['linear']
  }
  /**
   * 监听函数，需要在每次render的时候监听一下
   * @param  {Boolean} isListen 是否监听
   * 注意：此处监听为单向绑定，并非双向绑定
   * 一般情况下只建议改变dataBus，然后动画同步到元素自身之中
   */
  listen(isListen = true) {
    if (!isListen && this.frameNum === 0)
      return false

    let finishFlag = this.frameNum === this.nowFrame ? true : false
    // 没有发生变化的状态
    if (finishFlag && this.TO[this.TP] === this.LO[this.LP])
      return true

    //发生了变化，要进行动画的数据初始化
    if (finishFlag && this.TO[this.TP] !== this.LO[this.LP]) {
      this.prevData = this.TO[this.TP]
      this.changedData = this.LO[this.LP]
      this.nowFrame = 0
    }
    // 计算现在的参数    
    let aniArg = this.nowFrame / this.frameNum
    this.nowFrame++

    let caculatedData = (this.changedData - this.prevData) * this.aniFunc(aniArg)
    // 此处math.floor是为了兼容诸如score这类需要整形的元素
    // 如有疑问可以参见score.js里的渲染函数
    // 小问题：此处如果不加判断，仅仅依据caculatedData计算的话，会出现在动画结尾处绑定双方的值不一定相同
    // 所以三元运算符就是为了解决这个问题
    // 具体原因仍未知
    return this.TO[this.TP] =   this.nowFrame === this.frameNum
                              ? this.changedData
                              : this.prevData + Math.floor(caculatedData)
  }
}




