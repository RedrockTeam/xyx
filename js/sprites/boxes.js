import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'

const iconPath = 'images/box/'
const scallingRadio = 1.98 / screenWidth * 375

const boxConfig = {
  width: 128 / scallingRadio,
  height: 88 /scallingRadio,
  x: (screenWidth - 88 / scallingRadio) / 2 - 10 * screenWidth / 375,
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

    this.boxStartY = this.boxes[1].y
    this.boxHeight = this.boxes[1].height - 1
    // this.boxes[1].y -= this.boxHeight * 4
    // this.boxes[2].y -= this.boxHeight
    // this.boxes[3].y -= this.boxHeight * 2
    // this.boxes[5].y -= this.boxHeight * 3

    this.ani = new Animation( dataBus, 'height',
                              this, 'y',
                              100, 'quinticInOut' )
  }


  drawBoxes(ctx = this.ctx) {
    this.ani.listen()
    this.boxes.forEach((el, index) => {
      el.y = this.boxStartY - this.boxHeight * index + this.y
    })
    this.boxes[1].draw(ctx)
    this.boxes[2].draw(ctx)
    this.boxes[3].draw(ctx)
    this.boxes[5].draw(ctx)
  }
}