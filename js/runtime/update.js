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

  if (dataBus.frame % 100 === 0) {
    dataBus.boxList.push({type: Math.floor(Math.random() * 3) + 1, x: 0})
    if (dataBus.boxList.length === 3) {
       dataBus.height += 200
    }
    if (dataBus.boxList.length >= 7) {
      delete dataBus.boxList[dataBus.boxList.length - 7]
      dataBus.height += 44
    }
  }
}