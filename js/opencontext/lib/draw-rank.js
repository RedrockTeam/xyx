import Sprite from '../interfaces/sprite'

const screenWidth = sharedCanvas.width / wx.getSystemInfoSync().pixelRatio
const screenHeight = sharedCanvas.height / wx.getSystemInfoSync().pixelRatio

const canvasWidth = sharedCanvas.width
const canvasHeight = sharedCanvas.height

let numberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/rank/num/${index}.png`,
    width: (screenWidth * .016),
    height: 42 / 27 * (screenWidth * .016)
  })
})

let rankNumberList = [...Array(10)].map((el, index) => {
  return new Sprite({
    imgSrc: `images/rank/rank-num/${index}.png`,
    width: (screenWidth * .03),
    height: 35 / 27 * (screenWidth * .03)
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
    width: (screenWidth * .055),
    height: (screenHeight * .03),
    x: screenWidth * .225,
  })
})

let clover = new Sprite({
  imgSrc: 'images/rank/border.png',
  x: screenWidth * .25,
  width: screenWidth * .09,
  height: screenWidth * .09,
})

rankIcon[1].y = -screenHeight * .7
rankIcon[2].y = -screenHeight * .7 + (1 * screenHeight * .081)
rankIcon[3].y = -screenHeight * .7 + (2 * screenHeight * .081)

let drawData = []

export default function (ctx, isReq) {

  let drawFunc = () => {

    ctx.clearRect(0, 0, canvasWidth, -canvasHeight)

    drawData.sort((a, b) => {
      if (a.data.score !== b.data.score) 
        return a.data.score < b.data.score
      return a.openid < b.openid
    })
    drawData.forEach((el, index) => {
      ctx.font = `${canvasWidth * .04}px Arial`
      ctx.fillText(el.nickname, 
                   canvasWidth * .35, 
                   -canvasHeight * .66 + (index * canvasHeight * .081));
        
      el.avatar.y = -screenHeight * .695 + (index * screenHeight * .081)
      clover.y = -screenHeight * .695 + (index * screenHeight * .081)
      el.avatar.draw(ctx)
      clover.draw(ctx)

      if (index >= 3) {
        numberList[index + 1].x = screenWidth * .244
        numberList[index + 1].y = -screenHeight * .692 + (index * screenHeight * .081)
        rankIcon[0].y = -screenHeight * .7 + (index * screenHeight * .081)
        rankIcon[0].draw(ctx)
        numberList[index + 1].draw(ctx)
      }
      else {
        rankIcon[index + 1].draw(ctx)
      }

      console.log(drawData)
      

      ;`${el.data.score}`.split('').forEach((_num, _index) => {
        rankNumberList[_num].x = screenWidth * .69 + _index * 12
        rankNumberList[_num].y = -screenHeight * .675 + (index * screenHeight * .081)
        rankNumberList[_num].draw(ctx)
      })
    })
  }

  if (isReq) {
    wx.getFriendCloudStorage({
      keyList: ['all'],
      success(res) {

        ctx.fillStyle = '#9B806B'
        
        res.data.forEach(el => {
          if (el.KVDataList.find(e => e.key === 'all')) {
            el.data = JSON.parse(el.KVDataList.find(e => e.key === 'all').value)
            if (!el.data.score) el.data.score = 0
            if (el.nickname.length > 5) {
              el.nickname = el.nickname.slice(0, 6)
              el.nickname += '...'
            }
            el.avatar = new Sprite({
              imgSrc: el.avatarUrl,
              width: screenWidth * .09,
              height: screenWidth * .09,
              x: screenWidth * .25
            })
            drawData.push(el)
          }
        })
        drawData.length = 6
  
        drawFunc()
      }
    })
  }
  else {
    drawFunc()
  }
}