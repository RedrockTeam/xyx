let funcs = {
  // 两层ctx的绘画函数
  // 指游戏过程中
  ctxAssociateRender() {
    this.background.render()
    this.boxes.drawBoxes()
    // this.water.drawWater()
    this.light.drawLight()
  },

  ctxRender() {
    this.fixProgress.drawFixProgress()
    this.score.drawScoreNumber()
    this.sight.drawSight()
    this.hourglass.drawHourglass()
    this.pause.drawPauseButton()
  },

  listenEvent() {
    if (!dataBus.touchEndPoint) return false

    // 因为原图是全屏的，容易误点
    // 所以此处自定义了一个break point
    if (    dataBus.isPaused
         && dataBus.touchEndPoint.pageX >= screenWidth * 0.3
         && dataBus.touchEndPoint.pageX <= screenWidth * 0.7
         && -dataBus.touchEndPoint.pageY + screenHeight >= screenHeight * 0.3
         && -dataBus.touchEndPoint.pageY + screenHeight <= screenHeight * 0.7  ) {
      dataBus.isPaused = false
    }

    if (this.pause.runningIcon.isCollideWith(
              dataBus.touchEndPoint.pageX || 0,
              dataBus.touchEndPoint.pageY - screenHeight || 0)) {
      dataBus.isPaused = true
    }

    dataBus.touchEndPoint = {}
  }
}

export default function() {
  funcs.ctxAssociateRender.call(this)
  this.ctx.drawImage(canvasAssociate, 0, -screenHeight)

  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
}