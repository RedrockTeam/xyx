import getFriends from './lib/get-friends.js'
import drawRank from './lib/draw-rank.js'

let sharedCanvas = wx.getSharedCanvas()
let ctx = sharedCanvas.getContext('2d')

ctx.translate(0, sharedCanvas.height)

let frames = 0

wx.onMessage(data => {
  if (data.type === 'show_rank') {
    drawRank(ctx, frames++ % 10 === 0)
  }
})
