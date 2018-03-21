import BackGround from 'sprites/background'

const screenHeight = window.innerHeight

let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight)

export default class Main {
  constructor () {
    
    let x = new BackGround()

    x.render(ctx)
  }

  
}