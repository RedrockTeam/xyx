/**
 * 自己实现的双向绑定
 * @param  {[Object]} bindStartObject  绑定的其实对象
 * @param  {[String]} bindStartProper  绑定的起始属性名
 * @param  {[Object]} bindTargetObject 绑定的目标对象
 * @param  {[String]} bindTargetProper 绑定的目标对象名
 * @return {[Boolean]}                  是否绑定成功
 */
let twoWayBinding = function( bindStartObject, 
                              bindStartProper, 
                              bindTargetObject, 
                              bindTargetProper ) {

  if (typeof bindStartProper !== 'string' || typeof bindTargetProper !== 'string')
    return false

  if (typeof bindStartObject !== 'object' || typeof bindTargetObject !== 'object')
    return false

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

window.twoWayBinding = twoWayBinding