import { playButton } from '../sprites/clover'

let plbFlag = false
// let delFlag = false

let funcs = {
  ctxRender () {
    this.clover.drawClover()
  },

  listenEvent () {
    if (!dataBus.touchStartPoint) { return false }

    if (this.clover.playButton.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) { dataBus.gameStatus = 'playing' }

    if (this.clover.rankingButton.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) { dataBus.gameStatus = 'show_rank' }

    dataBus.touchStartPoint = {}
  }
}

export default function () {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)

  if (!plbFlag) {
    plbFlag = true
    if (dataBus.userInfo.avatarUrl)
      return false
    let infoButton = wx.createUserInfoButton({
      type: 'text',
      text: '',
      style: {
          left: playButton.x,
          top: playButton.y + screenHeight,
          width: playButton.width,
          height: playButton.height * 2,
      }
    })
    
    let check = (function () {
      let flag = false
      let func = () => {
        if (dataBus.userInfo.avatarUrl) {
          infoButton.hide()
          flag = true
        }
        if (!flag) setTimeout(func, 100)
      }
      return function () {
        setTimeout(func, 100)
      }
    })()
    check()

    infoButton.onTap((res) => {
      if (!res.rawData)
        return false
      dataBus.userInfo = res.userInfo
      infoButton.hide()
      wx.showToast({
        title: '授权成功'
      })
    })
  }
  
}
