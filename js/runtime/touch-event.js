export default function touchEvent() {
  wx.onTouchStart(e => {
    let tData = e.changedTouches[0]

    dataBus.touchStartPoint = tData
  })

  wx.onTouchMove(e => {
    let tData = e.changedTouches[0]

    dataBus.touchMovePoint = tData
  })

  wx.onTouchEnd(e => {
    console.log(e)
    let tData = e.changedTouches[0]

    dataBus.touchEndPoint = tData
  })
}