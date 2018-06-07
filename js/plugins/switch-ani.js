
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
        if ( (__gameStatus === 'show_rank' && value === 'show_score')
          || (__gameStatus === 'show_score' && value === 'show_rank') ) 
            return __gameStatus = value
          
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
    }
  })
}
