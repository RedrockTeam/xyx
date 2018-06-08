import Sprite from '../interfaces/sprite'

const iconPath = 'images/clover'

let cloverBg = new Sprite({
  imgSrc: `${iconPath}/clover-bg.jpg`,
  x: 0,
  y: -screenHeight,
  height: screenHeight,
  width: screenWidth
})

let playButton = new Sprite({
  imgSrc: `${iconPath}/play.png`,
  x: screenWidth * 0.265,
  y: -screenHeight * 0.3,
  height: screenWidth * 0.45 / 278 * 103,
  width: screenWidth * 0.45
})
let rankingButton = new Sprite({
  imgSrc: `${iconPath}/ranking.png`,
  x: screenWidth * 0.32,
  y: -screenHeight * 0.18,
  height: screenWidth * 0.34 / 278 * 103,
  width: screenWidth * 0.34
})


export default class Clover {
  constructor (ctx) {
    this.ctx = ctx

    this.cloverBg = cloverBg
    this.playButton = playButton
    this.rankingButton = rankingButton
  }

  drawClover (ctx = this.ctx) {
    this.cloverBg.draw(ctx)
    this.playButton.draw(ctx)
    this.rankingButton.draw(ctx)
  }
}

export { playButton }