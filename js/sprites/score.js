import Sprite from '../interfaces/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const iconPath = 'images/score/'

// 金币的Sprite
let coin = new Sprite({
  imgSrc: `${iconPath}coin.png`,
  width: 40, height: 85 / 97 * 40,
  x: 20,
  y: -screenHeight + 20
})
// 数字的Sprite
let scoreNumber = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `${iconPath}${index}.png`,
    y: -screenHeight + 22,
    width: 14, height: 64 / 31 * 14
  })
})

export default class Score {
  constructor(ctx) {
    // 维护ctx
    this.ctx = ctx

    this.coin = coin
    this.numberQueue = scoreNumber
    // 数字的x轴起始偏移量
    this.numStartX = 62

    let x = 1;
  }
  /**
   * 绘画指定数目的分数number
   * num 为绘画的数字，ctx为绘画的幕布对象
   */
  drawScoreNumber(num, ctx = this.ctx) {
    `${num}`.split('').forEach((el, index) => {
      this.numberQueue[el].x = this.numStartX + index * 20
      this.numberQueue[el].draw(ctx)
    })
  }
}