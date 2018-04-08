import BackGround from 'sprites/background'
import FixProgress from 'sprites/fix-progress'
import Score from 'sprites/score'
import Pause from 'sprites/pause'
import Sight from 'sprites/sight'
import Hourglass from 'sprites/hourglass'
import Boxes from 'sprites/boxes'
import GameOver from 'sprites/gameover'


import render from 'runtime/render'
import update from 'runtime/update'
import touchEvent from 'runtime/touch-event'

// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight) 

// 副屏，用来绘制背景等不是一直需要刷新的东西
// 切换也简单。只需要给不同的元素传不同的ctx就好
let ctxAssociate = canvasAssociate.getContext('2d')
    ctxAssociate.translate(0, screenHeight)

let worker = wx.createWorker('js/worker/index.js')

export default class Main {
  constructor () {

    window.main = this

    this.ctx = ctx
    this.ctxAssociate = ctxAssociate
    // 维护aniID
    this.aniId = 0

    this.dataBus = window.dataBus

    this.worker = worker

    this.background = new BackGround(ctxAssociate)
    this.boxes = new Boxes(ctxAssociate)

    this.score = new Score(ctx)
    this.fixProgress = new FixProgress(ctx)
    this.pause = new Pause(ctx)
    this.sight = new Sight(ctx)
    this.hourglass = new Hourglass(ctx)
    this.gameOver = new GameOver(ctx)

    this.touchEvent = touchEvent.bind(this)
    this.render = render.bind(this)
    this.update = update.bind(this)

    wx.getUserInfo({
      success(res) {
        dataBus.userInfo = res.userInfo
      }
    })
    
    wx.showShareMenu({
    withShareTicket: false
    })
    
    wx.onShareAppMessage(console.log)

    this.touchEvent()

    this.loop()
  }

  loop() {
    dataBus.frame++
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame( this.loop.bind(this) )
  }
}

