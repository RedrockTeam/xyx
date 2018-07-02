import getLastOne from '../libs/get-last-one'
import { boxHeight, boxWidth } from '../sprites/boxes'
import { changeCanDown } from '../runtime/update'

let fixDenoFlag = false
let msFlag = false
let exFlag = false
let hourglassFlag = false
let sightFlag = false

let funcs = {
  // 两层ctx的绘画函数
  // 指游戏过程中
  ctxAssociateRender () {
    this.background.render()
    this.boxes.drawBoxes()
    this.water.drawWater()
    if (dataBus.isShowSight) this.sight.drawSightLine()
    // this.light.drawLight()
  },

  ctxRender () {
    this.fixProgress.drawFixProgress()
    this.score.drawScoreNumber()
    this.sight.drawSight()
    this.hourglass.drawHourglass()
    this.music.drawMusicButton()
    this.scorePlus.drawPlus()
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

    if (dataBus.isPaused)
      return void 0
      
    if (this.pause.runningIcon.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) {
        dataBus.isPaused = true
        dataBus.touchStartPoint = {}
    }

    if ( this.music.stopIcon.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)
    || this.music.stopIcon.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0) ) {
      dataBus.isMusic = !dataBus.isMusic
      dataBus.touchStartPoint = {}
    }

    
    if (this.sight.iconLight.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) {
        if (dataBus.sightNumber === 0) return false
        if (sightFlag === false) {
          sightFlag = true
          dataBus.sightNumber--
          dataBus.isShowSight = true
          socket.pushItem('1')
          setTimeout(() => {
            sightFlag = false
            dataBus.isShowSight = false
          }, 5000)
        }
        dataBus.touchStartPoint = {}
    }

    if (this.hourglass.iconLight.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) {
        if (dataBus.hourglassNumber === 0) return false
        if (hourglassFlag === false) {
          hourglassFlag = true
          dataBus.hourglassNumber--        
          socket.pushItem('2')
          dataBus.isShowHourglass = true
          setTimeout(() => {
            hourglassFlag = false
            dataBus.isShowHourglass = false
          }, 5000)
        }
        dataBus.touchStartPoint = {}
    }

    if (dataBus.touchStartPoint.pageX && dataBus.boxList.length) {
      dataBus.boxList[dataBus.boxList.length - 1].isDown = true
      if (fixDenoFlag === false) {
        changeCanDown(false)
        setTimeout(() => {
          this.audio.boxDown.play()
        }, 0)
        setTimeout(() => {
          dataBus.fixNumerator++
          this.audio.boxDown.stop()
          fixDenoFlag = false
          changeCanDown(true)
        }, 600)
        fixDenoFlag = true
      }
    }
    
    dataBus.touchStartPoint = {}
  },

  missionFall () {
    dataBus.isStoped = true
    if (msFlag === false) {
      msFlag = true
      setTimeout(() => {
        msFlag = false
        dataBus.boxList.length = 0
        dataBus.height = 0
        dataBus.fixNumerator = 0
        dataBus.gameStatus = 'show_score'
        dataBus.isShowHourglass = false
        dataBus.isShowSight = false
        socket.pushScore()
        dataBus.boxList.score = 0
        dataBus.fixDenominator = 10
        // dataBus.userData.highestScore = Math.max(dataBus.userData.highestScore, dataBus.score)
        wx.setUserCloudStorage({
          KVDataList: [{
            key: 'all',
            value: JSON.stringify({
              sightNumber: dataBus.sightNumber,
              hourglassNumber: dataBus.hourglassNumber,
              score: Math.max(dataBus.userData.highestScore, dataBus.score)
            })
          }]
        })
        // score及时更新
        if (dataBus.score > dataBus.userData.highestScore)
          dataBus.userData.highestScore = dataBus.score
      }, 1000)
    }
  },

  excllent () {
    if (exFlag === false) {
      exFlag = true
      dataBus.isShowScore = true
      dataBus.plusShow = dataBus.boxList[dataBus.boxList.length - 1].type * 2
      setTimeout(() => {
        exFlag = false
        dataBus.isShowScore = false
      }, 1000)
    }
  }
}
// 事件处理函数
// 监听出现在该页面的诸如使用道具，满槽修正之类的事件
let eventFuncs = {
  fixFill () {
    if (fixFillControl) {
      let length = dataBus.boxList.length,
        index = length - 10 >= 0
          ? length - 10
          : 0
          for (; index < length; index++) {
            if (index === length - 1 && dataBus.boxList[index].isDown === false)
              return false
            if (dataBus.boxList[index].x >= 3) {
              dataBus.boxList[index].x -= 3
            } else if (dataBus.boxList[index].x <= -3) {
              dataBus.boxList[index].x += 3    
        } else {
          dataBus.boxList[index].x = 0
        }
      }
      if (dataBus.boxList.some((el, index) => el.x === 0)) {
        setTimeout(() => fixFillControl = false, 1000)
      }
    }
  }
}

// 使用这个的原因是为了实现一个动画效果
// 因为我的animation类，每次绑定只能绑定一个值
// 诸如此类的要绑定一个数组的，就不方便了
let fixFillControl = false

export default function () {
  funcs.ctxAssociateRender.call(this)

  // if (dataBus.gameControl.isNeedRefreshPlaying)
  funcs.ctxRender.call(this)


  
  // 修正条的函数
  if (dataBus.fixNumerator >= dataBus.fixDenominator && fixFillControl === false) {
    fixFillControl = true
    dataBus.boxPoint = 0
    dataBus.fixNumerator = 0
    dataBus.fixDenominator += 10
  }
  eventFuncs.fixFill.call(this)

  let compareX = dataBus.boxList[dataBus.boxList.length - 2]
    ? dataBus.boxList[dataBus.boxList.length - 2].x
    : 0,
    lastOne = getLastOne(dataBus.boxList)
  if (lastOne &&
     lastOne.isDown &&
     (!lastOne.isOK) &&
     (lastOne.x < compareX - (boxWidth / 2) ||
         lastOne.x > compareX + (boxWidth / 2)) &&
     dataBus.gameStatus === 'playing') {
    funcs.missionFall.call(this)
  }
  else if ( lastOne &&
            lastOne.isDowned &&
            lastOne.x > compareX - (boxWidth / 6) &&
            lastOne.x < compareX + (boxWidth / 6) &&
            dataBus.gameStatus === 'playing' ) {
    funcs.excllent.call(this)
  }
  
  funcs.listenEvent.call(this)
}
