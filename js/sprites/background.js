import Sprite from '../interfaces/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
// 不同图片高度不一样
const bgHeightList = [1334, 1416, 1375, 1375, 1000]

export default class BackGround {
  constructor() {
    // 创建图片队列
    this.queue = [...Array(5)].map((el, index, array) => {
      return new Sprite({
        imgSrc: (() => {
          return  index === 4
                ? 'images/background/05+.png'
                : `images/background/0${index + 1}.jpg`
        })(),
        width: screenWidth,
        height: bgHeightList[index] / 750 * screenWidth,
        x: 0,
        y: 0,
      })
    })
    // 控制绘画高度
    this.y = 0

    this.drawList = []
  }

  update() {
    this.drawList.length = 0
    bgHeightList.reduce((lastRe, val, index) => {
      //使用一个数字数组，提高性能
      if (   lastRe <= this.y
          && lastRe + bgHeightList[index] >= this.y - screenHeight)
        this.drawList.push(index)
      
      return lastRe - bgHeightList[index]
    }, 0)

  }

  /**
   * 绘画函数
   * 自动计算需要绘画的元素 减少绘画开销
   * @param  {[canvas apiport]} ctx 
   */
  render(ctx) {
    let that = this
    setInterval(() => {
      this.update()
      this.y -= 10
      console.log(this.drawList)
      this.drawList.forEach(el => {
        this.queue[el].y = this.y
        console.log(this.queue[el].y)
        that.queue[el].draw.call(that.queue(el))
      })
    }, 25)
  }

}