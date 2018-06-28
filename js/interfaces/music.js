import { API_PORT, IMG_PATH } from '../configs/options'
/**
 * 精灵类
 */
const audioPath = 'audios/'

export default class Music {
  /**
   * 构造函数传Object
   * @param  {[Object]} obj
   */
  constructor (obj = {}) {
    let ado = wx.createInnerAudioContext()
    
    ado.src = (() => {
      return obj.isChain ? '' : `${audioPath}${obj.src}`
    })()
    
    let tmpPlay = ado.play
    ado.play = function () {
      if (!dataBus.isMusic) { 
        ado.pause()
        return false 
      }
      tmpPlay.call(this)
      return true
    }
    return ado
  }

}
