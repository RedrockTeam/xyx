// 监听事件
// 本小游戏逻辑比较简单，故只使用一个点
// 如果有下一个点触摸，就放弃之前的点，使用下一个点
export default function touchEvent () {
  wx.onTouchStart(e => {
    let tData = e.changedTouches[0]

    dataBus.touchStartPoint = tData
  })

  wx.onTouchMove(e => {
    let tData = e.changedTouches[0]

    dataBus.touchMovePoint = tData
  })

  wx.onTouchEnd(e => {
    let tData = e.changedTouches[0]

    dataBus.touchEndPoint = tData
  })
}
