import Sprite from '../../interfaces/sprite'





export default class userAvator extends Sprite {
  constructor(obj) {

    let sprObj = Object.assign(
            { imgSrc: 'images/gameover/default-ava.png' }
            , obj )
    
    super(sprObj)

    this.isLoaded = false

    this.border = new Sprite( Object.assign(sprObj, {
      imgSrc: 'images/gameover/border.png'
    }))

    this.listenLoaded()
  }

  listenLoaded() {
    if (dataBus.userInfo && dataBus.userInfo.avatarUrl) {
      this.img.src = dataBus.userInfo.avatarUrl
      this.isLoaded = true
    }

    if (!this.isLoaded)
      setTimeout(this.listenLoaded.bind(this), 100)
  }

  drawCicle(ctx = this.ctx) {
    
    this.draw(ctx)

    this.border.draw(ctx)




    /**
     * 下面的注释是利用clip实现的图片变圆
     * 因为性能问题而ban了
     */

    // 因为绘制头像都是绘制圆的，所以此处定义了一个画圆的方法
    // 参考链接：https://www.jianshu.com/p/9a6ee2648d6f
    // ctx.save()

    // ctx.arc(  this.x + this.width / 2,
    //           this.y + this.height / 2,
    //           this.width / 2,
    //           0,
    //           Math.PI * 2 )

    // ctx.clip()
    
    // ctx.drawImage(  this.img,
    //                 this.x,
    //                 this.y,
    //                 this.width,
    //                 this.height )

    // ctx.strokeStyle = '#9F8858'
    // ctx.stroke()

    // ctx.restore()
  }
}


