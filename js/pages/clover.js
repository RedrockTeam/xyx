let funcs = {
  ctxRender() {
    this.clover.drawClover()

  },

  listenEvent() {


  }
}



export default function() {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)
}