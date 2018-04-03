export default {
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