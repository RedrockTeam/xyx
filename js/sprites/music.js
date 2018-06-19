import Sprite from '../interfaces/sprite'

const iconPath = 'images/music/'

// Sprite
let play = new Sprite({
  imgSrc: `${iconPath}play.png`,
  width: 50,
  height: 50,
  x: screenWidth - 65,
  y: -screenHeight + 115
})

let stop = new Sprite({
  imgSrc: `${iconPath}stop.png`,
  width: 50,
  height: 50,
  x: screenWidth - 65,
  y: -screenHeight + 115
})

export default class Pause {
  constructor (ctx) {
    // 维护ctx
    this.ctx = ctx

    this.playIcon = play
    this.stopIcon = stop
  }

  /**
   * 绘制指定的button
   */
  drawMusicButton (ctx = this.ctx) {
    if (!dataBus.isMusic) { return this.stopIcon.draw(ctx) }
    this.playIcon.draw(ctx)
  }
}
