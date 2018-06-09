import Sprite from '../interfaces/sprite'
// import Animation from '../interfaces/animation'

// 最简单的sprite了
// 除了渲染 什么功能都没有
const iconPath = 'images/'

let light = new Sprite({
  imgSrc: `${iconPath}light.png`,
  x: 0,
  y: -screenHeight,
  width: screenWidth,
  height: screenHeight
})

export default class Light {
  constructor (ctx) {
    this.ctx = ctx

    this.light = light

    twoWayBinding(this, 'y', dataBus, 'height')
  }

  /**
   * 实现了动态分辨率渲染
   * 如果高度到了一定程度，就渐渐地更改透明度
   */
  drawLight (ctx = this.ctx) {
    let nowOpa = Math.max((1 - Math.max(this.y - 1400, 0) / 400), 0)
    // 如果已经到了不用显示的地方，就不显示了
    if (!nowOpa) { return void 0 }
    // 如果还不需要变化opacity，就不用变
    if (nowOpa === 1) { return this.light.draw(ctx) }

    ctx.globalAlpha = nowOpa
    this.light.draw(ctx)
    ctx.globalAlpha = 1
  }
}
