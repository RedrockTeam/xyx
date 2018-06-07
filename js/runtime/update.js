import { boxHeight, boxWidth } from '../sprites/boxes'

/**
 * 逻辑更新函数
 */
let showRankFlag = false
let canDown = true

export default function  () {
  if (!dataBus.isPaused && !dataBus.isStoped) {
    dataBus.frame++

    // if (!(dataBus.frame % 100)) {
    //   if (dataBus.frame >= 1000)
    //     dataBus.score = 1000
    //   else
    //     dataBus.score += 100
    // }

    // dataBus.height += 0.5

    // dataBus.fixNumerator += 3

    // dataBus.sightNumber = 99
    // dataBus.hourglassNumber = 99
    if (!dataBus.boxList.score) dataBus.boxList.score = 0
    dataBus.score = dataBus.boxList.score

    // this.ctx.globalAlpha = dataBus.frame % 100 / 100

    // 创建下一个偏移量
    let topBox = dataBus.boxList.length && dataBus.boxList[dataBus.boxList.length - 1]
    // 元素添加
    // 每60帧检测一次
    if (dataBus.frame % 10 === 0 && dataBus.gameStatus === 'playing' && canDown) {
      let newBoxPoint = Math.random() * boxWidth - (boxWidth / 2)

      if (dataBus.boxList.length == 0 ||
        dataBus.boxList[dataBus.boxList.length - 1].isDowned) {
        dataBus.boxList.push({ 
          type: (() => {
            let d = Math.floor(Math.random() * 3) + 1

            if (d < 3 && dataBus.score >= 50) d = Math.random() > .5 ? 2 : 1
            else if (d === 4 && dataBus.score >= 50) d = 4
            else if (d === 4) d = 3
            
            return d
          })(),
          x: Math.random() * screenWidth - (screenWidth / 2),
          y: dataBus.boxList.dropStartY,
          height: boxHeight + 2,
          width: boxWidth,
          direction: [-1, 1][Math.floor(Math.random() * 2)] })
        
        // dataBus.boxList.scoreCount += dataBus.boxList[dataBus.boxList.length - 1].type

        if (dataBus.boxList.length >= 4) { this.dataBus.height += boxHeight }
      }
    }

    // 顶部的箱子 移动
    if (topBox && !topBox.isDowned) {
      topBox.x += topBox.direction * dataBus.boxSpeed
      if (Math.abs(topBox.x) >= (screenWidth + boxWidth) * .6 - 10) { topBox.x = -topBox.x }
    }

    dataBus.boxSpeed = dataBus.boxList.length * .2 + 3 * (dataBus.isShowHourglass ? .5 : 1)

    dataBus.boxPoint = topBox.x

  }
  /**
   * 给开放域传值
   */
  if (dataBus.gameStatus === 'show_rank' && !showRankFlag) {
    openDataContext.postMessage({type: 'show_rank'})
    showRankFlag = true
    setTimeout(() => showRankFlag = false, 1000)
  }
}

export function changeCanDown (arg) {
  canDown = arg
}