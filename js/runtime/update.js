/**
 * 逻辑更新函数
 */
export default function update() {
  dataBus.frame++

  dataBus.score++

  dataBus.height += 2

  dataBus.fixNumerator += 1
  dataBus.fixDenominator += 2

  dataBus.sightNumber++
  dataBus.hourglassNumber++
}