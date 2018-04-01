import Sprite from '../../interfaces/sprite'

const iconPath = 'images/tools-number/'

const WHradio = 42 / 27

let defaultConf = {
  size: 14,
  x: 0,
  y: -screenHeight
}

export default class Number {
  constructor(obj) {
    let conf = Object.assign(defaultConf, obj)

    let numberList = [...Array(10)].map((el, index) => {
      return new Sprite({
        imgSrc: `${iconPath}${index}.png`,
        width: conf.size,
        height: WHradio * conf.size,
        x: conf.x,
        y: conf.y
      })
    })

    return numberList
  }
}