import Sprite from '../interfaces/sprite'
import NumberList from 'public/number'

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 20,
  y: -screenHeight + 242
})

let iconDark = new Sprite({
  imgSrc: `${iconPath}sight-n.png`,
  x: screenWidth - 71,
  y: -screenHeight + 200,
  width: 88 / scallingRadio, height: 88 / scallingRadio
})
let iconLight = new Sprite({
  imgSrc: `${iconPath}sight.png`,
  x: screenWidth - 94,
  y: -screenHeight + 179,
  width: 157 / scallingRadio, height: 157 / scallingRadio
})



export default class Sight {
  constructor(ctx) {
    this.ctx = ctx

    this.iconDark = iconDark
    this.iconLight = iconLight
    this.numberList = numberList

    this.numberStartX = this.numberList[0].x

    this.sightNumber = 0

    this.bindToDataBus()
  }

  bindToDataBus(dataBus = window.dataBus) {
    twoWayBinding(dataBus, 'sightNumber', this, 'sightNumber')
  }

  drawSight(ctx = this.ctx) {
    if (this.sightNumber === 0) {
      this.iconDark.draw(ctx)
      return
    }
    this.iconLight.draw(ctx)

    let numberLength = `${this.sightNumber}`.length;
    `${this.sightNumber}`.split('').forEach((el, index) => {
      this.numberList[el].x = this.numberStartX - numberLength * 6.5 + index * 13
      this.numberList[el].draw(ctx)
    })
  }
}

