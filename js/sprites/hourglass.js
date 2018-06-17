import Sprite from '../interfaces/sprite'
import NumberList from 'public/tools-number'

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 24,
  y: -screenHeight + 307
})

let iconDark = new Sprite({
  imgSrc: `${iconPath}hourglass-n.png`,
  x: screenWidth - 65,
  y: -screenHeight + 270,
  width: 79 / scallingRadio,
  height: 79 / scallingRadio * 125 / 127
})
let iconLight = new Sprite({
  imgSrc: `${iconPath}hourglass.png`,
  x: screenWidth - 81,
  y: -screenHeight + 254,
  width: 125 / scallingRadio,
  height: 127 / scallingRadio
})

export default class Hourglass {
  constructor (ctx) {
    this.ctx = ctx

    this.iconDark = iconDark
    this.iconLight = iconLight
    this.numberList = numberList

    this.numberStartX = this.numberList[0].x

    this.hourglassNumber = 0

    this.bindToDataBus()
  }

  bindToDataBus (dataBus = window.dataBus) {
    twoWayBinding(dataBus, 'hourglassNumber', this, 'hourglassNumber')
  }

  drawHourglass (ctx = this.ctx) {
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
