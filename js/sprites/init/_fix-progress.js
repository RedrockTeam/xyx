import Sprite from '../../interfaces/sprite'
const iconPath = 'images/fix-progress/'

const scalingRatio = 1.7

// 进度条Sprite
let progressFull = new Sprite({
  imgSrc: `${iconPath}progress/progress-full.png`,
  width: 132 / scalingRatio, height: 300 / scalingRatio,
  x: 10, y: -240
})
let progressOut = new Sprite({
  imgSrc: `${iconPath}progress/progress-out.png`,
  width: 29 / scalingRatio, height: 255 / scalingRatio,
  x: 33, y: -225
})
let progressIn = new Sprite({
  imgSrc: `${iconPath}progress/progress-in.png`,
  width: 19 / scalingRatio, height: 243 / scalingRatio,
  x: 36, y: -220
})
// 箱子Sprite
let box = new Sprite({
  imgSrc: `${iconPath}progress/box.png`,
  width: 93 / scalingRatio, height: 42 / scalingRatio,
  x: 22, y: -96
})
let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `${iconPath}number/${index}.png`,
    width: 15 / scalingRatio, height: 18 / scalingRatio,
    x: 38, y: -110
  })
})
numberList['/'] = new Sprite({
  imgSrc: `${iconPath}number/slash.png`,
  width: 12 / scalingRatio, height: 19 / scalingRatio,
  x: 38, y: -110
})
