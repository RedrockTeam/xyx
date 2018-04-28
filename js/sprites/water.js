import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'

const iconPath = 'images/'

let water = new Sprite({
  isChain: true,
  imgSrc: `${iconPath}water.png`,
  x: 0,
  y: -screenHeight,
  width: screenWidth,
  height: screenHeight
})

export default class Water {
  constructor (ctx) {
    this.ctx = ctx

    this.water = water

    this.waterPercent = 0

    this.ani = new Animation(dataBus, 'waterPercent',
      this, 'waterPercent',
      30, 'quadraticIn')
  }

  drawWater (ctx = this.ctx) {
    this.ani.listen()
    if (!this.waterPercent) { return false }

    this.water.y = -this.waterPercent * screenHeight / 100
    this.water.draw(ctx)
  }
}
