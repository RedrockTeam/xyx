import Sprite from '../interfaces/sprite'

const screenWidth = sharedCanvas.width / wx.getSystemInfoSync().pixelRatio
const screenHeight = sharedCanvas.height / wx.getSystemInfoSync().pixelRatio


let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/score/${index}.png`,
    width: (screenWidth * .04),
    height: 42 / 27 * (screenWidth * .04),
    x: 0,
    y: -20
  })
})

export default function (ctx) {
  let drawData = []

  const canvasWidth = sharedCanvas.width
  const canvasHeight = sharedCanvas.height
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

      ctx.clearRect(0, 0, canvasWidth, -canvasHeight)

      drawData.sort((a, b) => a.data.score < b.data.score)
      drawData.forEach((el, index) => {
        ctx.font = `${screenWidth * .1}px Arial`
        ctx.fillText(el.nickname, 
                     canvasWidth * .35, 
                     -canvasHeight * .655 + (index * canvasHeight * .081));
        
        `${el.data.score}`.split('').forEach((_num, _index) => {
          numberList[_num].x = screenWidth * .69 + _index * 16
          numberList[_num].y = -screenHeight * .685 + (index * screenHeight * .081)
          numberList[_num].draw(ctx)
        })
      })
    }
  })
}