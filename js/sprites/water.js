import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'


const iconPath = 'images/'

let water = new Sprite({
  isChain: true,
  imgSrc: `${iconPath}water.png`,
  x: 0, y: -screenHeight,
  width: screenWidth, height: screenHeight
})


export default class Water {
  constructor(ctx) {
    this.ctx = ctx

    this.water = water
  }


  drawWater(ctx = this.ctx) {
    this.water.draw(ctx)
  }
}