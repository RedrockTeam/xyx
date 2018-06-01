import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'

const iconPath = 'images/score-plus/'

let sprIcon = []

sprIcon[2] = new Sprite({
  imgSrc: `${iconPath}/+2.png`
})

export default class Score {
  constructor (ctx) {
    // 维护ctx
    this.ctx = ctx

    this.num = 0

  }

  /**
   * 绘画指定数目的分数number
   * num 为绘画的数字，ctx为绘画的幕布对象
   */
  drawScoreNumber (num = this.num, ctx = this.ctx) {

  }
}
