import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'
import { quadraticIn } from '../configs/ani-function'

const iconPath = 'images/box/'
const scallingRadio = 1.98 / screenWidth * 375

const boxConfig = {
  width: 128 / scallingRadio,
  height: Math.ceil(88 / scallingRadio),
  x: (screenWidth - Math.ceil(88 / scallingRadio)) / 2 - 10 * screenWidth / 375,
  y: -92 * screenWidth / 375
}

let boxes = []

// boxes.proxy = new Proxy(boxes, {
//   get(target, key) {
//     if (+key && +key)
//   }
// })

boxes[1] = new Sprite(Object.assign(boxConfig, {
  imgSrc: `${iconPath}1-score.png`
}))
boxes[2] = new Sprite(Object.assign(boxConfig, {
  imgSrc: `${iconPath}2-score.png`
}))
boxes[3] = new Sprite(Object.assign(boxConfig, {
  imgSrc: `${iconPath}3-score.png`
}))
boxes[5] = new Sprite(Object.assign(boxConfig, {
  imgSrc: `${iconPath}5-score.png`
}))


export default class Box {
  constructor(ctx) {
    this.ctx = ctx

    this.boxes = boxes

    this.y = 0
    this.boxList = []

    this.dropBoxFlag = []
    this.boxStartY = this.boxes[1].y
    this.boxStartX = this.boxes[1].x
    this.boxHeight = this.boxes[1].height

    this.ani = new Animation( dataBus, 'height',
                              this, 'y',
                              60, 'quinticInOut' )

    // boxList 绑定
    twoWayBinding(this, 'boxList', dataBus, 'boxList')
    // twoWayBinding(this, 'boxPoint', dataBus, 'boxPoint')
  }


  drawBoxes(ctx = this.ctx) {
    this.ani.listen()
    // this.boxes.forEach((el, index) => {
    //   el.y = this.boxStartY - this.boxHeight * index + this.y
    // })
    // 减少绘画的盒子数目
    for ( let length = this.boxList.length, index = length - 8 >= 0 ? length - 8 : 0;
          index < length;
          index++) {
      let el = this.boxList[index]
      if (length <= index + 3) {
        if (el.isDown && (this.dropBoxFlag[index] || !el.isDowned)) {
          this.dropBoxFlag[index] = el.isDowned ? this.dropBoxFlag[index] : 30
          el.y = (1 - quadraticIn(1 - (--this.dropBoxFlag[index] / 30))) * this.boxList.dropStartY
          el.isDowned = true
        }
      }
      this.boxes[el.type].y = this.boxStartY - this.boxHeight * (index + 1) + this.y - el.y
      this.boxes[el.type].x = this.boxStartX + el.x
      this.boxes[el.type].draw(ctx)
    }
  }
}


export const boxHeight = Math.ceil(88 / scallingRadio)

export const boxWidth = 128 / scallingRadio
