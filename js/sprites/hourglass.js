import Sprite from '../interfaces/sprite'
import NumberList from 'public/number'

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 28,
  y: -screenHeight + 315
})

let iconDark = new Sprite({
  imgSrc: `${iconPath}hourglass-n.png`,
  x: screenWidth - 71,
  y: -screenHeight + 270,
  width: 88 / scallingRadio, height: 88 / scallingRadio
})
let iconLight = new Sprite({
  imgSrc: `${iconPath}hourglass.png`,
  x: screenWidth - 94,
  y: -screenHeight + 249,
  width: 157 / scallingRadio, height: 157 / scallingRadio
})



export default class Hourglass {
  constructor(ctx) {
    this.ctx = ctx

    this.iconDark = iconDark
    this.iconLight = iconLight
    this.numberList = numberList

    this.numberStartX = this.numberList[0].x

    this.hourglassNumber = 0

    this.bindToDataBus()
  }

  bindToDataBus(dataBus = window.dataBus) {
    twoWayBinding(dataBus, 'hourglassNumber', this, 'hourglassNumber')
  }

  drawHourglass(ctx = this.ctx) {
    if (this.hourglassNumber === 0) {
      this.iconDark.draw(ctx)
      return
    }
    this.iconLight.draw(ctx)

    let numberLength = `${this.hourglassNumber}`.length;
    `${this.hourglassNumber}`.split('').forEach((el, index) => {
      this.numberList[el].x = this.numberStartX - numberLength * 6.5 + index * 13
      this.numberList[el].draw(ctx)
    })
  }

}

