import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'
// 最简单的sprite了
// 除了渲染 什么功能都没有
const iconPath = 'images/'

let light = new Sprite({
  imgSrc: `${iconPath}light.png`,
  x: 0, y: -screenHeight,
  width: screenWidth, height: screenHeight
})


export default class Light {
  constructor(ctx) {
    this.ctx = ctx

    this.light = light
  }


  drawLight(ctx = this.ctx) {
    this.light.draw(ctx)
  }
}