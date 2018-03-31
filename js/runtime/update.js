/**
 * 逻辑更新函数
 */
export default function update() {
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
}