import Sprite from '../interfaces/sprite'

const iconPath = 'images/box/'
const scallingRadio = 1.98
const boxConfig = {
  width: 128 / scallingRadio,
  height: 88 /scallingRadio,
  x: (screenWidth - 88 / scallingRadio) / 2 - 10,
  y: -135.5
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

  }


  drawBoxes(ctx = this.ctx) {
    this.boxes[3].draw(ctx)
  }
}