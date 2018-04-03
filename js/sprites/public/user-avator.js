import Sprite from '../../interfaces/sprite'

export default class userAvator extends Sprite {
  constructor(obj) {

    let sprObj = Object.assign(
            { imgSrc: 'images/gameover/default-ava.png',
              width: screenWidth * 0.3, height: screenWidth * 0.3,
              x: screenWidth * 0.35,
              y: -screenHeight * 0.6 }
            , obj )
    
    super(sprObj)

    this.isLoaded = false

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

  // 因为绘制头像都是绘制圆的，所以此处定义了一个画圆的方法
  // 参考链接： http://www.zhangxinxu.com/wordpress/2014/06/svg-canvas-image-border-radius/
  drawScicle() {
    
  }
}


