import Sprite from '../interfaces/sprite'

export default class Mook {
  constructor(ctx) {
    this.ctx = ctx

  }

  drawMook(ctx = this.ctx) {
    if (!dataBus.drawMookFlag)
      return false
    
    ctx.globalAlpha = dataBus.drawMookFlag / 15
    ctx.fillRect(0 ,0 ,screenWidth * pixelRatio ,-screenHeight * pixelRatio)

    ctx.globalAlpha = 1
  }

} 