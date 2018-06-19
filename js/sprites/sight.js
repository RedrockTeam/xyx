import Sprite from '../interfaces/sprite'
import NumberList from 'public/tools-number'
import Animation from '../interfaces/animation'
import { boxHeight } from './boxes';

const iconPath = 'images/icon/'
const scallingRadio = 1.6

let flagO = 60
let prevLineX = 0
let flagT = 60

let numberList = new NumberList({
  size: 13,
  x: screenWidth - 24,
  y: -screenHeight + 287
})

let iconDark = new Sprite({
  imgSrc: `${iconPath}sight-n.png`,
  x: screenWidth - 65,
  y: -screenHeight + 250,
  width: 79 / scallingRadio,
  height: 79 / scallingRadio
})
let iconLight = new Sprite({
  imgSrc: `${iconPath}sight.png`,
  x: screenWidth - 81,
  y: -screenHeight + 234,
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
    this.activeLineStartY = this.activeLine.y

    this.sightNumber = 0
    this.boxPoint = 0

    this.bindToDataBus()
  }

  bindToDataBus (dataBus = window.dataBus) {
    twoWayBinding(this, 'sightNumber', dataBus, 'sightNumber')
    twoWayBinding(this, 'boxPoint', dataBus, 'boxPoint')
    this.ani = new Animation(dataBus, 'height',
      this, 'y',
      60, 'quinticInOut')
  }

  drawSight (ctx = this.ctx) {
    this.ani.listen()
    let lineX = (dataBus.boxList.length <= 1 ? 0 : dataBus.boxList[dataBus.boxList.length - 2].x)
    if (prevLineX != lineX) {
      if (Math.abs(prevLineX - lineX) <= 3) prevLineX = lineX
      else if (prevLineX > lineX) prevLineX -= 2
      else prevLineX += 2
    }
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
    if (dataBus.boxList.length <= 0)
      return false

    this.activeLine.x = this.activeLineStartX + prevLineX

                        
    // this.activeLine.y =   this.activeLineStartY
    //                     - (dataBus.height - this.y)
    //                     + (dataBus.boxList.length - 3) * boxHeight

    this.activeLine.draw(ctx)   
  }
}
