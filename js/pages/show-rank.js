import gobFunc from 'public/gameover-btn'

let funcs = {
  ctxRender () {
    this.gameOver.drawRankList()
  },

  listenEvent () {
    if (!window.dataBus.touchStartPoint) { return false }

    gobFunc.call(this)

    if (this.gameOver.scoreBtn.isCollideWith(
      window.dataBus.touchStartPoint.pageX || 0,
      window.dataBus.touchStartPoint.pageY - screenHeight || 0)) { window.dataBus.gameStatus = 'show_score' }

    window.dataBus.touchStartPoint = {}
  }
}

export default function () {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
  
  this.ctx.drawImage(sharedCanvas, 0, -sharedCanvas.height)
}
