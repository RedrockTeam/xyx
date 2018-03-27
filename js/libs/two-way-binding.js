/**
 * 自己实现的双向绑定
 * 采用defineProperty方法实现
 * @param  {[string]} bindThing  绑定的起始属性名，本小游戏中为databus中的属性
 * @param  {[all]} bindTarget 绑定的同步目标属性（非属性名），本小游戏中为元素中的自有属性
 */
let twoWayBinding = function(bindThing, bindTarget) {
  Object.defineProperty(dataBus, bindThing, {
    
  })
}