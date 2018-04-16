import Sprite from '../interfaces/sprite'
import Animation from '../interfaces/animation'

const iconPath = 'images/background/'

// 不同图片高度不一样
const bgHeightListOrigin = [1334, 1416, 1375, 1375, 1375]
// 维护前几个图片的高度梯度
let bgStepListOrigin = []

// 创建Proxy, 实现对 index >= 5 的时候返回正确的值
// 借此方法实现对于5以后的index获取到正确的数值
let bgHeightList = new Proxy(bgHeightListOrigin, {
  get(target, key) {
    if (!+key) return target[key]
      return  +key <= 4
            ? target[key]
            : target[4]
  }
})
let bgStepList = new Proxy(bgStepListOrigin, {
  get(target, key) {
    if (!+key)  return target[key]
    return  +key <= 4
          ? target[key]
          : target[4] - bgHeightList[4] / 750 * screenWidth * (+key - 4)
  }
})
// 对bgStepList进行赋值操作
bgHeightList.reduce((lastRe, val, index) => {
  bgStepListOrigin[index] = lastRe - bgHeightList[index] / 750 * screenWidth
  return bgStepListOrigin[index]
}, 0)

export default class BackGround {
  constructor(ctx) {
    // 维护ctx
    this.ctx = ctx
    /**
     * 创建图片队列 使用Proxy实现即时创建功能
     * bgConfig 抽离出公共属性，queueOrigin创建Proxy宿主
     * this.queue为Proxy对象，对于大于5的键值实现即时创建&使用
     */
    let bgConfig = {
      width: screenWidth,
      x: 0,
      y: 0,
    }
    let queueOrigin = [...Array(5)].map((el, index, array) => {
      return new Sprite(Object.assign(bgConfig, {
        // 初始创建的时候就先创建到05+.png
        // 这样的好处是日后新创建相同src的img对象的时候，无需再次读取
        isChain: index >= 2 ? true : false,
        imgSrc: (() => {
          return  index === 4
                ? `${iconPath}05+.jpg`
                : `${iconPath}0${index + 1}.jpg`
        })(),
        height: bgHeightList[index] / 750 * screenWidth,
      }))
    })
    this.queue = new Proxy(queueOrigin, {
      get(target, key) {
        if (!+key) return target[key]
        // 如果已经创建过该键值，就不再创建
        return  typeof target[key] === 'undefined'
              ? target[key] = new Sprite(Object.assign(bgConfig, { 
                   isChain: true,
                   imgSrc: `${iconPath}05+.jpg`,
                   height: bgHeightList[key] / 750 * screenWidth
                 }))
              : target[key]
      }
    })
    // 控制绘画高度
    this.y = 0
    // 维护需要绘画的图片列表 增加性能
    this.drawList = []

    this.ani = new Animation( dataBus, 'height',
                              this, 'y',
                              60, 'quinticInOut')
  }

  updateDrawList() {
    // 清空上一次的列表
    this.drawList.length = 0
    // 创建现阶段需要渲染的背景图列表
    let heightStandard = this.y
    let loopIndex = 0
    while (heightStandard + screenHeight >= 0) {
      heightStandard -= bgHeightList[loopIndex] / 750 * screenWidth
      if (heightStandard <= 0) {
        this.drawList.push(loopIndex)
      }
      loopIndex++
    }
  }

  /**
   * 绘画函数
   * @param  {[canvas apiport]} ctx
   */
  render(ctx = this.ctx) {
    this.ani.listen()
    this.updateDrawList()
    this.drawList.forEach((el, index) => {
        this.queue[el].y = bgStepList[el] + this.y
        this.queue[el].draw(ctx)
    })
  }
}