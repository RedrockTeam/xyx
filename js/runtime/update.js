import { boxHeight, boxWidth } from '../sprites/boxes'

/**
 * 逻辑更新函数
 */

const boxRender = (() => {
      let isNeedNewBox = true
      return () => {
        if (dataBus.frame % 10 === 0 && isNeedNewBox) {

          let newBoxPoint = Math.random() * boxWidth - (boxWidth / 2);


          if ( dataBus.boxList.length === 0
            || dataBus.boxList[dataBus.boxList.length - 1].isDowned) {
            dataBus.boxList.push({  type: Math.floor(Math.random() * 3) + 1,
                                    x: Math.random() * boxWidth - (boxWidth / 2),
                                    y: dataBus.boxList.dropStartY,
                                    direction: [-1, 1][Math.floor(Math.random() * 2)] })

            isNeedNewBox = false
            setTimeout(() => isNeedNewBox = true, 500)

            if (dataBus.boxList.length >= 4)
              this.dataBus.height += boxHeight
          }
        }
      }
    })()


export default function update() {
  if (!dataBus.isPaused) {
    dataBus.frame++



    // if (!(dataBus.frame % 100)) {
    //   if (dataBus.frame >= 1000)
    //     dataBus.score = 1000
    //   else 
    //     dataBus.score += 100
    // }

    // dataBus.height += 0.5

    // dataBus.fixNumerator += 3

    dataBus.sightNumber = 99
    dataBus.hourglassNumber = 99

    dataBus.score++


    // this.ctx.globalAlpha = dataBus.frame % 100 / 100

    // 创建下一个偏移量
    let topBox = dataBus.boxList.length && dataBus.boxList[dataBus.boxList.length - 1]
    dataBus.boxPoint = topBox.x;
    // 元素添加
    // 每60帧检测一次
    boxRender()

    // 顶部的箱子 移动
    if (topBox && !topBox.isDowned) {
      topBox.x += topBox.direction * 3
      if (Math.abs(topBox.x) >= (screenWidth - boxWidth) * 0.5 - 10)
        topBox.direction = -topBox.direction
    }
  }
}
