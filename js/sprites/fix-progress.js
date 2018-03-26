import Sprite from '../interfaces/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const iconPath = 'images/fix-progress/'

const scalingRatio = 1.7
const srawPlace = { x: 10, y: -240 }

// 进度条Sprite
let progressFull = new Sprite({
  imgSrc: `${iconPath}progress/progress-full.png`,
  width: 132 / scalingRatio, height: 300 / scalingRatio,
  x: 10, y: -240
})
let progressOut = new Sprite({
  imgSrc: `${iconPath}progress/progress-out.png`,
  width: 29 / scalingRatio, height: 255 / scalingRatio,
  x: 33, y: -225
})
let progressIn = new Sprite({
  imgSrc: `${iconPath}progress/progress-in.png`,
  width: 19 / scalingRatio, height: 243 / scalingRatio,
  x: 36, y: -221
})
// 箱子Sprite
let box = new Sprite({
  imgSrc: `${iconPath}progress/box.png`,
  width: 93 / scalingRatio, height: 42 / scalingRatio,
  x: 22, y: -96
})
let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `${iconPath}number/${index}.png`,
    width: 15 / scalingRatio, height: 18 / scalingRatio,
    x: 38, y: -110
  })
})
numberList['/'] = new Sprite({
  imgSrc: `${iconPath}number/slash.png`,
  width: 12 / scalingRatio, height: 19 / scalingRatio,
  x: 38, y: -110
})


export default class FixProgress {
  constructor(ctx) {
    this.ctx = ctx

    this.progressFull = progressFull
    this.progressIn = progressIn
    this.progressOut = progressOut
    this.box = box
    this.numberList = numberList

    //绘图起始地点存档
    this.boxStartY = this.box.y
    this.numberStartX = this.numberList[0].x
    this.numberStartY = this.numberList[0].y
    //分母
    this.denominator = 10000
    //分子
    this.numerator = 10000
  }

  drawFixProgress(ctx = this.ctx) {
    let boxOffsetY = this.numerator / this.denominator
    let numberString = `${this.numerator}/${this.denominator}`.split('')
    let numberOffsetX = this.numberStartX - numberString.length * 4
    let numberOffsetY = this.numberStartY - boxOffsetY * 132
    // 绘图点处理
    this.box.y = this.boxStartY - boxOffsetY * 132
    this.progressFull.draw(ctx)
    this.progressOut.draw(ctx)
    this.progressIn.draw(ctx)
    this.box.draw(ctx)
    // 画数据
    numberString.forEach((el, index, arr) => {
      this.numberList[el].x = numberOffsetX + index * 9
      this.numberList[el].y = numberOffsetY
      this.numberList[el].draw(ctx)
    })
  }
}

