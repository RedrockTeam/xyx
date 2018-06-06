import iPhoneX from './iphone-x'
import switchAni from './switch-ani.js'
// 插件队列
let pluginList = [
  iPhoneX,
  switchAni
]

// 接口输出的函数
// 此处通过bind实现传递到各个插件函数的this是main实例
let pluginFuncs = function () {
  pluginList.forEach(func => func.call(this))
}
// 将插件队列暴露出去
pluginFuncs.list = pluginList

export default pluginFuncs
