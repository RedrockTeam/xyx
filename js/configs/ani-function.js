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
