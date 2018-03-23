import BackGround from 'sprites/background'
import Score from 'sprites/score'

const screenHeight = window.innerHeight
// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight)

export default class Main {
  constructor () {
    
    this.bg = new BackGround(ctx)
    this.score = new Score(ctx)

    // setInterval(() => {
    //   this.bg.render()
      
    // }, 16)
  }

  restart() {
    
  }

}