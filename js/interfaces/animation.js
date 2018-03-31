// const aniFuncPath = 'ani-function/'

import * as func from './ani-function.js'

/**
 * 动画class
 * @param  {[Object]} bindStartObject  绑定的其实对象
 * @param  {[String]} bindStartProper  绑定的起始属性名
 * @param  {[Object]} bindTargetObject 绑定的目标对象
 * @param  {[String]} bindTargetProper 绑定的目标对象名
 * @param  {[String]} frameNum 动画需要的帧数
 * @param  {[String]} aniFuncName 动画函数名
 */
export default class Animation {
  constructor(bindStartObject, 
              bindStartProper, 
              bindTargetObject, 
              bindTargetProper,
              frameNum = 0,
              aniFuncName = 'ease' ) {
    
    this.prevData = 0
    this.changedData = 0

    this.frameNum = frameNum
    this.nowFrame = frameNum

    this.LO = bindStartObject
    this.LP = bindStartProper
    this.TO = bindTargetObject    
    this.TP = bindTargetProper

    this.aniFunc = func[aniFuncName] || func['ease']
    // 如果不需要动画，就是简单的绑定一下
    // 就调用双向绑定的函数绑定即可
    if (this.frameNum === 0)
      twoWayBinding(this.LO, this.LP, this.TO, this.TP)
  }

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
    console.log(caculatedData, this.nowFrame, this.frameNum)
    return this.TO[this.TP] =   this.nowFrame === this.frameNum
                              ? this.changedData
                              : this.prevData + Math.floor(caculatedData)
  }
}












// /**
//  * 自己实现的双向绑定 - 无延迟绑定
//  * 采用defineProperty实现
//  * @param  {[Object]} bindStartObject  绑定的其实对象
//  * @param  {[String]} bindStartProper  绑定的起始属性名
//  * @param  {[Object]} bindTargetObject 绑定的目标对象
//  * @param  {[String]} bindTargetProper 绑定的目标对象名
//  * @return {[Boolean]}                 是否绑定成功
//  */
// let twoWayBinding = function( bindStartObject, 
//                               bindStartProper, 
//                               bindTargetObject, 
//                               bindTargetProper,
//                               frameNum = 0,
//                               aniFuncName = 'ease' ) {

//   if (  typeof bindStartProper !== 'string' 
//      || typeof bindTargetProper !== 'string'
//      || typeof aniFuncName !== 'string' )
//     return false

//   if (  typeof bindStartObject !== 'object' 
//      || typeof bindTargetObject !== 'object' )
//     return false

//   if (  typeof frameNum !== 'number' || frameNum < 0  )
//     return false

//   //如果没有动画，就使用defineProperty
//   if (frameNum === 0) {
//     bindTargetObject[bindTargetProper] = bindStartObject[bindStartProper]

//     Object.defineProperty(bindStartObject, bindStartProper, {
//       get() {
//         return bindTargetObject[bindTargetProper]
//       },
//       set(value) {
//         return bindTargetObject[bindTargetProper] = value
//       }
//     })
//     return true
//   }


//   if (typeof this[__.objKey].prevData === 'undefined')
//     this[__.objKey].prevData = 0

//   if (typeof this[__.objKey].finishFlag === 'undefined')
//     this[__.objKey].finishFlag = true

//   //如果有动画，就使用动画函数，实现延迟绑定
//   let listenTarget = bindStartObject[bindStartProper],
//       listener     = bindTargetObject[bindTargetProper],
//       aniFunction  = func[aniFuncName] || func['ease'],
//       prevData     = this[__.objKey].prevData,
//       flag         = this[__.objKey].finishFlag




//   return true
// }

// window.twoWayBinding = twoWayBinding

// export default twoWayBinding