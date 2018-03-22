import BackGround from 'sprites/background'

const screenHeight = window.innerHeight
// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight)

export default class Main {
  constructor () {
    
    this.bg = new BackGround(ctx)

    setInterval(() => {
      this.bg.render()
    }, 16)
  }

  
}