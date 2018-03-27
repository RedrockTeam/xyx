function ctxAssociateRender() {
  this.background.render()
}

function ctxRender() {
  this.fixProgress.drawFixProgress()
  this.score.drawScoreNumber()
  this.pause.drawPauseButton()
}
/**
 * 渲染函数
 * ctx地层级永远在ctxAssociate之上
 */
export default function render() {  
  this.ctx.clearRect(0, 0, screenWidth, -screenHeight)
  this.ctxAssociate.clearRect(0, 0, screenWidth, -screenHeight)

  ctxAssociateRender.call(this)

  this.ctx.drawImage(canvasAssociate, 0, -screenHeight)
  
  ctxRender.call(this)
}