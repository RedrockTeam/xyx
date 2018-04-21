import Sprite from '../interfaces/sprite'
import NumberList from 'public/tools-number'
import Animation from '../interfaces/animation'

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 18,
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

let activeLine = new Sprite({
  imgSrc: 'images/sight/active-line.png',
  x: -12,
  y: -screenWidth / 9 * 16,
  width: screenWidth, height: screenWidth / 9 * 16
})


export default class Sight {
  constructor(ctx) {
    this.ctx = ctx

    this.iconDark = iconDark
    this.iconLight = iconLight
    this.numberList = numberList
    this.activeLine = activeLine

    this.numberStartX = this.numberList[0].x
    this.activeLineStartX = this.activeLine.x

    this.sightNumber = 0
    this.boxPoint = 0

    this.bindToDataBus()
  }

  bindToDataBus(dataBus = window.dataBus) {
    twoWayBinding(dataBus, 'sightNumber', this, 'sightNumber')
    this.ani = new Animation(dataBus, 'boxPoint', this, 'boxPoint', 20)
  }

  drawSight(ctx = this.ctx) {
    this.ani.listen()
    if (this.sightNumber === 0) {
      this.iconDark.draw(ctx)
      return
    }
    this.iconLight.draw(ctx)

    this.activeLine.x = this.activeLineStartX + this.boxPoint
    this.activeLine.draw(ctx)

    let numberLength = `${this.sightNumber}`.length;
    `${this.sightNumber}`.split('').forEach((el, index) => {
      this.numberList[el].x = this.numberStartX - numberLength * 6.5 + index * 13
      this.numberList[el].draw(ctx)
    })
  }
}

