/**
 * 动画函数
 * 传入的k是一个0-1之间的数值
 * 会返回一个0-1之间的数字，用来动画
 */
export function linear (k) {
  return k
}

export function quinticInOut (k) {
  if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k }
  return 0.5 * ((k -= 2) * k * k * k * k + 2)
}

export function quadraticIn (k) {
  return k * k
}

export function easeOutBounce (t) {
  if ((t/=1) < (1/2.75)) {
    return 1*(7.5625*t*t);
  } else if (t < (2/2.75)) {
    return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
  } else if (t < (2.5/2.75)) {
    return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
  } else {
    return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
  }
}

export function easeInOutBack (t) {
  var s = 1.70158; 
  if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
  return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
}