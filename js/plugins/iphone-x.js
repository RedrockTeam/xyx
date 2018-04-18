/**
 * iPhoneX的适配函数
 * 主要改变了头部的score和暂停按钮的位置
 * 解决了刘海屏的问题
 */
const testReg = /iPhone\ X/

export default function iPhoneX() { 
  if (testReg.test(dataBus.systemInfo.model)) {
    // score类下移
    this.score.coin.y += 35
    this.score.numberQueue.forEach(sprite => {
      sprite.y += 35
    })
    // 暂停类下移
    this.pause.runningIcon.y += 33
    // gameover 分享按钮下移
    this.gameOver.shareBtn.y += 28
    this.gameOver.shareTipBtn.y += 28
  }
}