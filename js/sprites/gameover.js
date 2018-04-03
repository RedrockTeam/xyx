import Sprite from '../interfaces/sprite'
import UserAvator from 'public/user-avator'

const iconPath = 'images/gameover/'
const scallingRatio = 2

// Sprite
let bg = new Sprite({
  imgSrc: `${iconPath}bg.jpg`,
  x: 0, y: -screenHeight,
  width: screenWidth,
  height: screenHeight
})
// 游戏结束页面的Sprite
let winScoreDesk = new Sprite({
  imgSrc: `${iconPath}win-score/desk.png`,
  x: screenWidth * 0.03, y: -screenHeight * 0.76,
  width: screenWidth * 0.94,
  height: screenHeight *  0.6,
})
let winScoreNum = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `${iconPath}win-score/score-num/${index}.png`,
    x: screenWidth * 0.47, y: -screenHeight * 0.465,
    width: 47 / scallingRatio, height: 85 / scallingRatio
  })
})
let winHistoryNum = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `${iconPath}win-score/history-num/${index}.png`,
    x: screenWidth * 0.5, y: -screenHeight * 0.3,
    width: 35 / scallingRatio, height: 55 / scallingRatio
  })
})
// 共用的Sprite
let button = new Sprite({
  imgSrc: `${iconPath}button.png`,
  x: screenWidth * 0.5 - 342 / scallingRatio / 2, 
  y: -screenHeight * 0.235,
  width: 342 / scallingRatio, height: 127 / scallingRatio
})
let shareBtn = new Sprite({
  imgSrc: `${iconPath}share.png`
})
let gohomeBtn = new Sprite({
  imgSrc: `${iconPath}gohome.png`,
})
let rankBtn = new Sprite({
  imgSrc: `${iconPath}ranking.png`,
  width: screenWidth * 0.35 , height: 106 / 263 * screenWidth * 0.35,
  x: screenWidth * 0.51,
  y: -screenHeight * 0.78
})
let rankBtnA = new Sprite({
  imgSrc: `${iconPath}ranking-A.png`,
  width: screenWidth * 0.35 , height: 106 / 263 * screenWidth * 0.35,
  x: screenWidth * 0.51,
  y: -screenHeight * 0.78
})
let scoreBtn = new Sprite({
  imgSrc: `${iconPath}score.png`,
  width: screenWidth * 0.35 , height: 106 / 263 * screenWidth * 0.35,
  x: screenWidth * 0.17,
  y: -screenHeight * 0.78
})
let scoreBtnA = new Sprite({
  imgSrc: `${iconPath}score-A.png`,
  width: screenWidth * 0.35 , height: 106 / 263 * screenWidth * 0.35,
  x: screenWidth * 0.17,
  y: -screenHeight * 0.78
})


export default class Pause {
  constructor(ctx) {
    // 维护ctx
    this.ctx = ctx

    this.isStoped = false

    this.bg = bg
    this.winScoreDesk = winScoreDesk
    this.winScoreNum = winScoreNum
    this.winHistoryNum = winHistoryNum
    this.button = button

    this.userAvator = new UserAvator()

    this.winScoreNumStartX = this.winScoreNum[0].x
    this.winHistoryNumStartX = this.winHistoryNum[0].x

    this.score = 0
    twoWayBinding(this, 'score', dataBus, 'score')
    this.scoreAni = 0

  }
  /**
   * 表示当时绘画的是结束后的得分页面
   */
  drawWinScore(ctx = this.ctx) {
    this.bg.draw(ctx)
    this.winScoreDesk.draw(ctx);

    `${this.score}`.split('').forEach((el, index) => {
      this.winScoreNum[el].x = this.winScoreNumStartX + index * 50 / scallingRatio
      this.winScoreNum[el].draw(ctx)
    });

    `${this.score}`.split('').forEach((el, index, arr) => {
      this.winHistoryNum[el].x =  this.winHistoryNumStartX 
                                - (arr.length / 2) * this.winHistoryNum[0].width
                                + index * 35 / scallingRatio
      this.winHistoryNum[el].draw(ctx)
    })
    
    this.button.draw(ctx)

    rankBtn.draw(ctx)
    scoreBtnA.draw(ctx)
    this.userAvator.draw(ctx)
  }
}