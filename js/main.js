import BackGround from 'sprites/background'
import FixProgress from 'sprites/fix-progress'
import Score from 'sprites/score'
import Pause from 'sprites/pause'
import Music from 'sprites/music'
import Sight from 'sprites/sight'
import Hourglass from 'sprites/hourglass'
import Boxes from 'sprites/boxes'
import Water from 'sprites/water'
import Light from 'sprites/light'
import GameOver from 'sprites/gameover'
import Clover from 'sprites/clover'
import ScorePlus from 'sprites/score-plus'
import Mook from 'sprites/mook'

import audio from 'music/index'

import render from 'runtime/render'
import update from 'runtime/update'
import touchEvent from 'runtime/touch-event'
import userData from 'runtime/user-data'

import Socket from 'api/socket'

import pluginFuncs from 'plugins/index'

import { GAME_DEBUG } from 'configs/options'

canvas.width = canvas.width * pixelRatio
canvas.height = canvas.height * pixelRatio
canvasAssociate.height = canvasAssociate.height * pixelRatio
canvasAssociate.width = canvasAssociate.width * pixelRatio
sharedCanvas.height = sharedCanvas.height * pixelRatio
sharedCanvas.width = sharedCanvas.width * pixelRatio

// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
ctx.translate(0, canvas.height)

// 副屏，用来绘制背景等不是一直需要刷新的东西
// 切换也简单。只需要给不同的元素传不同的ctx就好
let ctxAssociate = canvasAssociate.getContext('2d')
ctxAssociate.translate(0, canvasAssociate.height)

let sharedCtx = sharedCanvas.getContext('2d')
sharedCtx.translate(0, sharedCanvas.height)

wx.setPreferredFramesPerSecond(60)

export default class Main {
  constructor () {
    if (GAME_DEBUG) window.main = this

    this.ctx = ctx
    this.ctxAssociate = ctxAssociate
    this.sharedCtx = sharedCtx
    // 维护aniID
    this.aniId = 0

    this.dataBus = window.dataBus

    this.worker = wx.createWorker('/js/worker/index.js')

    this.pluginFuncs = pluginFuncs

    this.audio = audio

    this.background = new BackGround(ctx)
    this.boxes = new Boxes(ctx)
    this.water = new Water(ctx)
    this.light = new Light(ctx)

    this.score = new Score(ctx)
    this.fixProgress = new FixProgress(ctx)
    this.pause = new Pause(ctx)
    this.music = new Music(ctx)
    this.sight = new Sight(ctx)
    this.hourglass = new Hourglass(ctx)
    this.gameOver = new GameOver(ctx)
    this.clover = new Clover(ctx)
    this.scorePlus = new ScorePlus(ctx)
    this.mook = new Mook(ctx)

    this.userData = userData.bind(this)
    this.touchEvent = touchEvent.bind(this)
    this.render = render.bind(this)
    this.update = update.bind(this)

    this.socket = new Socket()
    window.socket = this.socket

    this.userData()

    this.touchEvent()

    this.pluginFuncs()

    this.loop()

    this.socket.open()

  }

  loop () {
    this.update()
    this.render()
    this.aniId = window.requestAnimationFrame(this.loop.bind(this))
  }
}
