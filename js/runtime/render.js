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
    playingFuncs.call(this)

    return
  }

  if ( dataBus.gameStatus.toLowerCase() === "show_score" ) {
    showScoreFuncs.call(this)

    return
  }

  if ( dataBus.gameStatus.toLowerCase() === "show_rank" ) {
    showRankList.call(this)

    return
  }


}