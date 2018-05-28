/**
 * 精灵类
 */
pixelRatio = wx.getSystemInfoSync().pixelRatio

export default class Sprite {
  /**
   * 构造函数传Object
   * @param  {[Object]} obj
   */
  constructor (obj = {}) {
    let defConf = {
      imgSrc: '',
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      visible: true,
      dx: 0,
      dy: 0,
      // isChain的作用是，判断该Sprite是否是外链
      isChain: false
    }

    let sprObj = Object.assign(defConf, obj)

    this.img = wx.createImage()
    this.img.src = sprObj.imgSrc;
    // 解构赋值的问题 前面加个分号可以避免
    [this.x, this.y] = [sprObj.x, sprObj.y];
    [this.width, this.height] = [sprObj.width, sprObj.height];
    [this.dx, this.dy] = [sprObj.dx, sprObj.dy]

    this.visible = sprObj.visible
  }

  /**
   * 绘制在canvas上
   * @param  {[Object]} ctx 绘画的ctx幕布
   * @param  {[Boolean]} enforce 强制绘画（忽略visible属性）
   * @return {[Boolean]} 是否成功
   * 返回false 意味着这个sprite是不可见的
   */
  draw (ctx, enforce = false) {
    if (!this.visible && !enforce) { return false }
    ctx.drawImage(this.img,
      this.x * pixelRatio,
      this.y * pixelRatio,
      this.width * pixelRatio,
      this.height * pixelRatio)
    return true
  }

  drawClip (ctx, clipConf, enforce = false) {
    if (!this.visible && !enforce) { return false }

    ctx.drawImage(this.img,
      clipConf.sx,
      clipConf.sy,
      clipConf.sWidth,
      clipConf.sHeight,
      this.x * pixelRatio,
      this.y * pixelRatio,
      this.width * pixelRatio,
      this.height * pixelRatio)
    return true
  }

  isCollideWith (sx = 0, sy = 0) {
    if (!this.visible) { return false }

    return !!(sx >= this.x &&
              sx <= this.x + this.width &&
              sy >= this.y &&
              sy <= this.y + this.height)
  }
}
