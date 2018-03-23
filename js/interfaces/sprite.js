/**
 * 精灵类 
 */
export default class Sprite {
  /**
   * 构造函数传Object 
   * @param  {[Object]} obj
   */
  constructor(obj = {}) {
    let defConf = {
      imgSrc: '',
      width: 0, height: 0,
      x: 0, y: 0,
      visible: true
    }
    let sprObj = Object.assign(defConf, obj)

    this.img = wx.createImage()
    this.img.src = sprObj.imgSrc;
    //解构赋值的问题 前面加个分号可以避免
    [this.x, this.y] = [sprObj.x, sprObj.y];
    [this.width, this.height] = [sprObj.width, sprObj.height];

    this.visible = sprObj.visible
    
  }

  /**
   * 绘制在canvas上
   * @param  {[Object]} ctx 绘画的ctx幕布
   * @param  {[Boolean]} enforce 强制绘画（忽略visible属性）
   * @return {[Boolean]} 是否成功
   * 返回false 意味着这个sprite是不可见的
   */
  draw(ctx, enforce = false) {
    if (!this.visible && !enforce)
      return false

    ctx.drawImage(  this.img,
                    this.x,
                    this.y,
                    this.width,
                    this.height )
    return true
  }
}