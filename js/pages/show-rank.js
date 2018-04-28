import gobFunc from 'public/gameover-btn'

let funcs = {
  ctxRender () {
    this.gameOver.drawRankList()
  },

  listenEvent () {
    if (!window.dataBus.touchEndPoint) { return false }

    gobFunc.call(this)

    if (this.gameOver.scoreBtn.isCollideWith(
      window.dataBus.touchEndPoint.pageX || 0,
      window.dataBus.touchEndPoint.pageY - screenHeight || 0)) { window.dataBus.gameStatus = 'show_score' }

    window.dataBus.touchEndPoint = {}
  }
}

export default function () {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
}
