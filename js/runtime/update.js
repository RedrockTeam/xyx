import { boxHeight, boxWidth } from '../sprites/boxes'

/**
 * 逻辑更新函数
 */


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

    dataBus.fixNumerator += 1
    dataBus.fixDenominator += 2

    dataBus.sightNumber++
    dataBus.hourglassNumber++

    dataBus.score++

    // this.ctx.globalAlpha = dataBus.frame % 100 / 100

    // 创建下一个偏移量

    if (dataBus.frame % 61 === 0) {

      let newBoxPoint = Math.random() * boxWidth - (boxWidth / 2);

      dataBus.boxPoint += newBoxPoint

      dataBus.boxList.push({  type: Math.floor(Math.random() * 3) + 1,
                              x: dataBus.boxPoint  })

      if (dataBus.frame >= 300) this.dataBus.height += boxHeight
    }

  }
}
