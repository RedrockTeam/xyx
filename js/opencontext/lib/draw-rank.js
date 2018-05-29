import Sprite from '../interfaces/sprite'

const screenWidth = sharedCanvas.width / wx.getSystemInfoSync().pixelRatio
const screenHeight = sharedCanvas.height / wx.getSystemInfoSync().pixelRatio


let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/score/${index}.png`,
    width: (screenWidth * .04),
    height: 42 / 27 * (screenWidth * .04)
  })
})

let rankNumberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/score/${index}.png`,
    width: (screenWidth * .02),
    height: 42 / 27 * (screenWidth * .02)
  })
})

let rankIcon = [...Array(4)].map((el, index) => {
  let iconName = ''
  switch (index) {
    case 0: 
      iconName = 'th'
      break
    case 1:
      iconName = '1st'
      break
    case 2: 
      iconName = '2nd'
      break
    default: 
      iconName = '3rd'
  }
  return new Sprite({
    imgSrc: `images/rank/${iconName}.png`,
    width: (screenWidth * .06),
    height: (screenHeight * .035),
    x: screenWidth * .265,
  })
})

rankIcon[1].y = -screenHeight * .685
rankIcon[2].y = -screenHeight * .685 + (1 * screenHeight * .081)
rankIcon[3].y = -screenHeight * .685 + (2 * screenHeight * .081)


export default function (ctx) {
  let drawData = []

  const canvasWidth = sharedCanvas.width
  const canvasHeight = sharedCanvas.height
  wx.getFriendCloudStorage({
    keyList: ['all'],
    success(res) {
      res.data.forEach(el => {
        if (el.KVDataList.find(e => e.key === 'all')) {
          el.data = JSON.parse(el.KVDataList.find(e => e.key === 'all').value)
          if (!el.data.score) el.data.score = 0
          if (el.nickname.length > 5) {
            el.nickname = el.nickname.slice(0, 6)
            el.nickname += '...'
          }
          drawData.push(el)
        }
      })
      drawData.length = 6

      ctx.clearRect(0, 0, canvasWidth, -canvasHeight)

      drawData.sort((a, b) => a.data.score < b.data.score)
      drawData.forEach((el, index) => {
        ctx.font = `${screenWidth * .1}px Arial`
        ctx.fillText(el.nickname, 
                     canvasWidth * .35, 
                     -canvasHeight * .655 + (index * canvasHeight * .081));
        
        
        if (index >= 3) {
          rankNumberList[index + 1].x = screenWidth * .285
          rankNumberList[index + 1].y = -screenHeight * .675 + (index * screenHeight * .081)
          rankIcon[0].y = -screenHeight * .685 + (index * screenHeight * .081)
          rankIcon[0].draw(ctx)
          rankNumberList[index + 1].draw(ctx)
        }
        else {
          rankIcon[index + 1].draw(ctx)
        }

        

        ;`${el.data.score}`.split('').forEach((_num, _index) => {
          numberList[_num].x = screenWidth * .69 + _index * 16
          numberList[_num].y = -screenHeight * .685 + (index * screenHeight * .081)
          numberList[_num].draw(ctx)
        })
      })
    }
  })
}