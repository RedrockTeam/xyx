

let playingFuncs = {
  // 两层ctx的绘画函数
  // 指游戏过程中
  ctxAssociateRender() {
    this.background.render()
    this.boxes.drawBoxes()
  },

  ctxRender() {
    this.fixProgress.drawFixProgress()
    this.score.drawScoreNumber()
    this.pause.drawPauseButton()
    this.sight.drawSight()
    this.hourglass.drawHourglass()
  }
}

let showScoreFuncs = {
  ctxRender() {
    this.gameOver.drawWinScore()
  }
}
/**
 * 渲染函数
 * ctx的层级永远在ctxAssociate之上
 */
export default function render() {  
  this.ctx.clearRect(0, 0, screenWidth, -screenHeight)
  this.ctxAssociate.clearRect(0, 0, screenWidth, -screenHeight)

  if ( dataBus.gameStatus.toLowerCase() === "playing") {
    playingFuncs.ctxAssociateRender.call(this)
    this.ctx.drawImage(canvasAssociate, 0, -screenHeight)
    
    playingFuncs.ctxRender.call(this)

    return
  }

  if ( dataBus.gameStatus.toLowerCase() === "show_score") {
    showScoreFuncs.ctxRender.call(this)

    return
  }


}