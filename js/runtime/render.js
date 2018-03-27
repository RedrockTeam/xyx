export default function render() {  
  this.ctx.clearRect(0, 0, screenWidth, -screenHeight)
  this.background.render()
  this.fixProgress.drawFixProgress()
  this.score.drawScoreNumber()
  this.pause.drawPauseButton()
}