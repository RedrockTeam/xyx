// 是否在调试阶段
// 如果是的话，入口实例main将会挂载到global对象下
// 方便调试
export const GAME_DEBUG = true

// 请求接口
export const API_PORT = 'https://wx.idsbllp.cn'

// 外链图片接口
export const IMG_PATH = '/extension/img/xyx-images/'

// 获取用户 openid 的接口
// 因为安全原因，secret放在了后端进行处理
// 具体可以参见 https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject
export const OPENID_PATH = '/StrongBox/Info'
