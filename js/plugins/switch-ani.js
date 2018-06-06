
let __gameStatus = dataBus.gameStatus,
    aniCounter = 0,
    couFlag = 1

export default function switchAni() {
  let that = this
  Object.defineProperty(dataBus, 'gameStatus', {
    get() {
      return __gameStatus
    },
    set(value) {
      let func = () => {
        console.log(dataBus.drawMookFlag)
        dataBus.drawMookFlag += couFlag
        if (dataBus.drawMookFlag >= 15 && couFlag === 1) {
          couFlag = -1
          __gameStatus = value
        }
        if (dataBus.drawMookFlag === -1) {
          dataBus.drawMookFlag = 0
          couFlag = 1
        }
        else {
          setTimeout(func, 16)
        }
      }
      setTimeout(func, 16)
      // let inter = setInterval(() => {
      //   if (aniCounter++ >= 30) aniCounter = -30
      //   this.ctx.globalAlpha = (30 - Math.abs(aniCounter)) / 30
      //   this.ctx.fillRect(0, 0, screenWidh, -screenHeight)
      //   if (aniCounter === 0)
      //     return dataBus.gameStatus = value
      // }, 16)
    }
  })
}
