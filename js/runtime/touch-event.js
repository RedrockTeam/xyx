// 监听事件
// 本小游戏逻辑比较简单，故只使用一个点
// 如果有下一个点触摸，就放弃之前的点，使用下一个点
export default function touchEvent () {
  wx.onTouchStart(e => {
    let tData = e.changedTouches[0]

    // 16ms 的延迟，是为了让在静音的时候能及时反馈
    // 考虑到用户体验，16ms还是能够接受
    setTimeout(this.audio.tap.play.bind(this.audio.tap), 16)

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
