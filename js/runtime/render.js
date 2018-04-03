import playingFuncs from '../pages/playing'
import showRankList from '../pages/show-rank'
import showScoreFuncs from '../pages/show-score'

/**
 * 渲染函数
 * ctx的层级永远在ctxAssociate之上
 */
export default function render() {  
  this.ctx.clearRect(0, 0, screenWidth, -screenHeight)
  this.ctxAssociate.clearRect(0, 0, screenWidth, -screenHeight)

  if ( dataBus.gameStatus.toLowerCase() === "playing" ) {
    playingFuncs.ctxAssociateRender.call(this)
    this.ctx.drawImage(canvasAssociate, 0, -screenHeight)
    
    playingFuncs.ctxRender.call(this)

    return
  }

  if ( dataBus.gameStatus.toLowerCase() === "show_score" ) {
    showScoreFuncs.ctxRender.call(this)

    return
  }

  if ( dataBus.gameStatus.toLowerCase() === "show_rank" ) {
    showRankList.ctxRender.call(this)

    return
  }


}