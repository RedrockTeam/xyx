import DataBus from 'databus'
import BackGround from 'sprites/background'
import FixProgress from 'sprites/fix-progress'
import Score from 'sprites/score'
import Pause from 'sprites/pause'

import render from 'runtime/render'
import update from 'runtime/update'

let dataBus = new DataBus()
// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
    ctx.translate(0, screenHeight)

export default class Main {
  constructor () {

    this.ctx = ctx
    this.dataBus = dataBus

    this.background = new BackGround(ctx)
    this.score = new Score(ctx)
    this.fixProgress = new FixProgress(ctx)
    this.pause = new Pause(ctx)

    this.render = render.bind(this)
    this.update = update.bind(this)

    setInterval(() => {
      this.update()
      this.render()
    }, 16)
  }
}