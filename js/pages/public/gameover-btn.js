export default function() {

  if (this.gameOver.shareBtn.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0))
    wx.shareAppMessage({
      success(res) {
        console.log(res)
      }
    })


  if (this.gameOver.gohomeBtn.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0))
    dataBus.gameStatus = 'playing'
  
  if (this.gameOver.button.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0))
    dataBus.gameStatus = 'playing'
}