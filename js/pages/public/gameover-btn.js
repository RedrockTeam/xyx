// 公共的监听函数
// 用于rank和score页面上
export default function () {
  if (this.gameOver.shareBtn.isCollideWith(
    dataBus.touchStartPoint.pageX || 0,
    dataBus.touchStartPoint.pageY - screenHeight || 0)) {
    wx.shareAppMessage({
      success (res) {
        console.log(res)
        let ranNum = Math.ceil(Math.random() * 2)
        socket.getItem(ranNum)
        dataBus[ranNum === 1 ? 'sight' : 'hourglass' + 'Number']++        

        wx.showToast({
          title: `获得${ranNum === 1 ? '瞄准镜' : '沙漏'}一个`
        })
      }
    })
    dataBus.touchStartPoint = {}
  }

  if (this.gameOver.gohomeBtn.isCollideWith(
    dataBus.touchStartPoint.pageX || 0,
    dataBus.touchStartPoint.pageY - screenHeight || 0)) {
    dataBus.gameStatus = 'clover'
    dataBus.isStoped = false
    dataBus.touchStartPoint = {}
  }

  if (this.gameOver.button.isCollideWith(
    dataBus.touchStartPoint.pageX || 0,
    dataBus.touchStartPoint.pageY - screenHeight || 0)) {
    dataBus.score = 0
    dataBus.boxList.length = 0
    dataBus.gameStatus = 'playing'
    dataBus.isStoped = false
    dataBus.touchStartPoint = {}
    // dataBus.gameStatus = 'playing'
  }

}
