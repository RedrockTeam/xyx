import Sprite from '../interfaces/sprite'

let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `/images/score/${index}.png`,
    width: 20,
    height: 42 / 27 * 20,
    x: 0,
    y: -20
  })
})

export default function (ctx) {
  let drawData = []

  wx.getFriendCloudStorage({
    keyList: ['all'],
    success(res) {
      console.log(res)

      res.data.forEach(el => {
        if (el.KVDataList.find(e => e.key === 'all')) {
          el.data = JSON.parse(el.KVDataList.find(e => e.key === 'all').value)
          drawData.push(el)
        }
      })
      console.log(drawData)

      ctx.clearRect(0, 0, sharedCanvas.width, -sharedCanvas.height)
      ctx.fillStyle = 'grey'
      numberList[0].draw(ctx)
      ctx.globalAlpha = .5
      ctx.fillRect(sharedCanvas.width * .2, -sharedCanvas.height * .23,
                   sharedCanvas.width * .6, -sharedCanvas.height * .47)
    }
  })
}