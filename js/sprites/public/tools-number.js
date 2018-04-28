import Sprite from '../../interfaces/sprite'
/**
 * 此处是用于沙漏和瞄准镜的道具,因为可以共用就抽离了出来
 * 视觉小姐姐做图太精细了！这个游戏光0-9数字就有7种！
 */
const iconPath = 'images/tools-number/'

const WHradio = 42 / 27

let defaultConf = {
  size: 14,
  x: 0,
  y: -screenHeight
}

export default class Number {
  constructor (obj) {
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
