import gobFunc from 'public/gameover-btn'

let funcs = {
  ctxRender() {
    this.gameOver.drawWinScore()
  },

  listenEvent() {
    if (!dataBus.touchEndPoint)
      return false

    gobFunc.call(this)

    if (this.gameOver.rankBtn.isCollideWith(
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