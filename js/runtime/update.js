/**
 * 逻辑更新函数
 */
export default function update() {
  dataBus.frame++

  this.score.num++
  this.fixProgress.numerator += 10
  this.background.update()
}