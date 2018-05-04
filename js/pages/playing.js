import getLastOne from '../libs/get-last-one'
import { boxHeight, boxWidth } from '../sprites/boxes'

let funcs = {
  // 两层ctx的绘画函数
  // 指游戏过程中
  ctxAssociateRender () {
    this.background.render()
    this.boxes.drawBoxes()
    this.water.drawWater()
    this.sight.drawSightLine()
    // this.light.drawLight()
  },

  ctxRender () {
    this.fixProgress.drawFixProgress()
    this.score.drawScoreNumber()
    this.sight.drawSight()
    this.hourglass.drawHourglass()
    this.pause.drawPauseButton()
  },

  listenEvent () {
    if (!dataBus.touchStartPoint) return false

    // 因为原图是全屏的，容易误点
    // 所以此处自定义了一个area
    if (dataBus.isPaused &&
         dataBus.touchStartPoint.pageX >= screenWidth * 0.3 &&
         dataBus.touchStartPoint.pageX <= screenWidth * 0.7 &&
         -dataBus.touchStartPoint.pageY + screenHeight >= screenHeight * 0.3 &&
         -dataBus.touchStartPoint.pageY + screenHeight <= screenHeight * 0.7) {
      dataBus.isPaused = false
      dataBus.touchStartPoint = {}
    }

    if (this.pause.runningIcon.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) {
      dataBus.isPaused = true
      dataBus.touchStartPoint = {}
    }

    if (dataBus.touchStartPoint.pageX && dataBus.boxList.length) {
      dataBus.boxList[dataBus.boxList.length - 1].isDown = true
      dataBus.fixNumerator++
    }

    dataBus.touchStartPoint = {}
  },

  missionFall () {
    dataBus.boxList.forEach(el => {
      dataBus.isStoped = true
      dataBus.boxList[dataBus.boxList.length - 1].y = 0
      setTimeout(() => {
        dataBus.boxList.length = 0
        dataBus.height = 0
        dataBus.gameStatus = 'show_score'
      }, 1000)
    })
  }
}
// 事件处理函数
// 监听出现在该页面的诸如使用道具，满槽修正之类的事件
let eventFuncs = {
  fixFill () {
    if (fixFillControl) {
      let length = dataBus.boxList.length,
        index = length - dataBus.fixDenominator >= 0
          ? length - dataBus.fixDenominator
          : 0
      for (; index < length; index++) {
        if (dataBus.boxList[index].x >= 3) {
          dataBus.boxList[index].x -= 3
        } else if (dataBus.boxList[index].x <= -3) {
          dataBus.boxList[index].x += 3
        } else {
          dataBus.boxList[index].x = 0
        }
      }
      if (dataBus.boxList.every(el => el.x === 0)) fixFillControl = false
    }
  }
}

// 使用这个的原因是为了实现一个动画效果
// 因为我的animation类，每次绑定只能绑定一个值
// 诸如此类的要绑定一个数组的，就不方便了
let fixFillControl = false

export default function () {
  funcs.ctxAssociateRender.call(this)

  this.ctx.drawImage(canvasAssociate, 0, -canvas.height)

  // if (dataBus.gameControl.isNeedRefreshPlaying)
  funcs.ctxRender.call(this)

  // 修正条的函数
  if (dataBus.fixNumerator >= dataBus.fixDenominator && fixFillControl === false) {
    fixFillControl = true
    dataBus.boxPoint = 0
    dataBus.fixNumerator = 0
  }
  eventFuncs.fixFill.call(this)

  let compareX = dataBus.boxList[dataBus.boxList.length - 2]
    ? dataBus.boxList[dataBus.boxList.length - 2].x
    : 0
  if (getLastOne(dataBus.boxList) &&
     getLastOne(dataBus.boxList).isDowned &&
     (getLastOne(dataBus.boxList).x < compareX - (boxWidth / 2) ||
         getLastOne(dataBus.boxList).x > compareX + (boxWidth / 2)) &&
     dataBus.gameStatus === 'playing') {
    funcs.missionFall()
  }

  funcs.listenEvent.call(this)
}
