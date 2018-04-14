let funcs = {
  ctxRender() {
    this.clover.drawClover()

  },

  listenEvent() {
    if (!dataBus.touchEndPoint)
      return false

    if (this.clover.playButton.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0))
      dataBus.gameStatus = 'playing'

    if (this.clover.rankingButton.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0))
      dataBus.gameStatus = 'show_rank'

    dataBus.touchEndPoint = {}
  }
}



export default function() {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
}