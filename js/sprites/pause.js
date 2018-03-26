import Sprite from '../interfaces/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const iconPath = 'images/icon/'

// 金币的Sprite
let running = new Sprite({
  imgSrc: `${iconPath}pause.png`,
  width: 50, height: 50,
  x: screenWidth - 20,
  y: -screenHeight + 100
})
let stoped = new Sprite({
  imgSrc: `${iconPath}pause.png`,
  width: 50, height: 50,
  x: screenWidth - 20,
  y: -screenHeight + 100
})


export default class Pause {
  constructor(ctx) {
    // 维护ctx
    this.ctx = ctx

    this.isStoped = false

    this.stoped = stoped
    this.running = running
  }
  /**
   * 绘制指定的button
   * isStoped指是否暂停，ctx为绘画的幕布对象
   */
  drawPauseButton(isStoped = this.isStoped, ctx = this.ctx) {
    if (1) {

    }
  }
}