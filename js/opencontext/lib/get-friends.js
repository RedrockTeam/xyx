export default function (ctx) {
  wx.getFriendCloudStorage({
    keyList: ['all'],
    success(res) {
      console.log(res)

      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, sharedCanvas.width, -sharedCanvas.height)

    }
  })
}