import Sprite from '../interfaces/sprite'
import NumberList from 'public/tools-number'
import Animation from '../interfaces/animation'

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 24,
  y: -screenHeight + 237
})

let iconDark = new Sprite({
  imgSrc: `${iconPath}sight-n.png`,
  x: screenWidth - 65,
  y: -screenHeight + 200,
  width: 79 / scallingRadio,
  height: 79 / scallingRadio
})
let iconLight = new Sprite({
  imgSrc: `${iconPath}sight.png`,
  x: screenWidth - 81,
  y: -screenHeight + 184,
  width: 129 / scallingRadio,
  height: 129 / scallingRadio
})

let activeLine = new Sprite({
  imgSrc: 'images/sight/active-line.png',
  x: -screenWidth * 0.5,
  y: -screenWidth * 2 * 1334 / 1600,
  width: screenWidth * 2,
  height: screenWidth * 2 * 1334 / 1600
})

export default class Sight {
  constructor (ctx) {
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

  bindToDataBus (dataBus = window.dataBus) {
    twoWayBinding(this, 'sightNumber', dataBus, 'sightNumber')
    twoWayBinding(this, 'boxPoint', dataBus, 'boxPoint')
  }

  drawSight (ctx = this.ctx) {
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

  drawSightLine (ctx = this.ctx) {
    if (dataBus.boxList.length <= 1)
      return false

    this.activeLine.x =  this.activeLineStartX 
                       + dataBus.boxList[dataBus.boxList.length - 2].x
    this.activeLine.draw(ctx)   
  }
}
