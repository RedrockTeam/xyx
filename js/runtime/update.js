let flag = 0

export default function update() {
  flag++;
  
  this.score.num++
  this.fixProgress.numerator += 10
  this.background.update()
}