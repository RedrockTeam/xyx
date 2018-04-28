
// let __gameStatus = dataBus.gameStatus,
//     aniCounter = -30

// export default function switchAni() {
//   Object.defineProperty(dataBus, 'gameStatus', {
//     get() {
//       return __gameStatus
//     },
//     set(value) {
//       let inter = setInterval(() => {
//         if (aniCounter++ >= 30) aniCounter = -30
//         this.ctx.globalAlpha = (30 - Math.abs(aniCounter)) / 30
//         this.ctx.fillRect(0, 0, screenWidh, -screenHeight)
//         if (aniCounter === 0)
//           return dataBus.gameStatus = value
//       }, 16)
//     }
//   })
// }
