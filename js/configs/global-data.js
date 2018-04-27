import '../libs/symbol'
import '../libs/two-way-binding'
import '../libs/get-last-one'

import DataBus from '../databus'

/**
 * 全局data
 * 这样做的好处是对于几乎所有页面都要import的模块，或者是一些配置参数
 * 可以很方便的一次引入 到处使用
 * 需要挂载在window对象下（本为global对象，wx-adapter封装到了window对象下
 */
// 屏幕长宽
window.screenWidth = window.innerWidth
window.screenHeight = window.innerHeight
window.pixelRatio = window.devicePixelRatio

// 副canvas
// 主canvas wx-adapter已经创建，为window.canvas
window.canvasAssociate = wx.createCanvas()

/**
 * 引入dataBus
 * 官方demo是在main函数中引入的dataBus，这样的缺点是，需要的地方都要再次引入
 * 本游戏所有元素的draw方法都是直接跟dataBus中的数据挂钩的
 * 这样的好处是可以确保全局状态管理器永远都是最新的
 */
window.dataBus = new DataBus()