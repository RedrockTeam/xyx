// const aniFuncPath = 'ani-function/'

import * as func from './ani-function.js'

const __ = {
  objKey: Symbol('objKey')
}
/**
 * 自己实现的双向绑定 - 无延迟绑定
 * 采用defineProperty实现
 * @param  {[Object]} bindStartObject  绑定的其实对象
 * @param  {[String]} bindStartProper  绑定的起始属性名
 * @param  {[Object]} bindTargetObject 绑定的目标对象
 * @param  {[String]} bindTargetProper 绑定的目标对象名
 * @return {[Boolean]}                 是否绑定成功
 */
let twoWayBinding = function( bindStartObject, 
                              bindStartProper, 
                              bindTargetObject, 
                              bindTargetProper,
                              frameNum = 0,
                              aniFuncName = 'ease' ) {

  if (  typeof bindStartProper !== 'string' 
     || typeof bindTargetProper !== 'string'
     || typeof aniFuncName !== 'string' )
    return false

  if (  typeof bindStartObject !== 'object' 
     || typeof bindTargetObject !== 'object' )
    return false

  if (  typeof frameNum !== 'number' || frameNum < 0  )
    return false

  //如果没有动画，就使用defineProperty
  if (frameNum === 0) {
    bindTargetObject[bindTargetProper] = bindStartObject[bindStartProper]

    Object.defineProperty(bindStartObject, bindStartProper, {
      get() {
        return bindTargetObject[bindTargetProper]
      },
      set(value) {
        return bindTargetObject[bindTargetProper] = value
      }
    })
    return true
  }


  if (typeof this[__.objKey].prevData === 'undefined')
    this[__.objKey].prevData = 0

  if (typeof this[__.objKey].finishFlag === 'undefined')
    this[__.objKey].finishFlag = true

  //如果有动画，就使用动画函数，实现延迟绑定
  let listenTarget = bindStartObject[bindStartProper],
      listener     = bindTargetObject[bindTargetProper],
      aniFunction  = func[aniFuncName] || func['ease'],
      prevData     = this[__.objKey].prevData,
      flag         = this[__.objKey].finishFlag




  return true
}

window.twoWayBinding = twoWayBinding

export default twoWayBinding