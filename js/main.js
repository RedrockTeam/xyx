import BackGround from 'sprites/background'
import FixProgress from 'sprites/fix-progress'
import Score from 'sprites/score'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight)

export default class Main {
  constructor () {
    
    this.bg = new BackGround(ctx)
    this.score = new Score(ctx)
    this.fixProgress = new FixProgress(ctx)

    setInterval(() => {
      ctx.clearRect(0, 0, screenWidth, -screenHeight)
      this.fixProgress.drawFixProgress()
      this.score.drawScoreNumber(Math.floor(Math.random() * 10000000))
      this.score.coin.draw(ctx)
    }, 16)
  }

  restart() {
    
  }

}