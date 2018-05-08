import gobFunc from 'public/gameover-btn'

let funcs = {
  ctxRender () {
    this.gameOver.drawWinScore()
  },

  listenEvent () {
    if (!dataBus.touchStartPoint) { return false }

    gobFunc.call(this)

    if (this.gameOver.rankBtn.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) { dataBus.gameStatus = 'show_rank' }

    dataBus.touchStartPoint = {}
  }
}

export default function () {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
}
