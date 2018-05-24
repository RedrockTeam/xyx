import Sprite from '../interfaces/sprite'

export default function (ctx) {
  wx.getFriendCloudStorage({
    keyList: ['all'],
    success(res) {
      console.log(res)

      ctx.fillStyle = 'grey'
      ctx.globalAlpha = .5
      ctx.fillRect(sharedCanvas.width * .2, -sharedCanvas.height * .23,
                   sharedCanvas.width * .6, -sharedCanvas.height * .47)
    }
  })
}