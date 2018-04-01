export function linear(k) {
  return k
}

export function quinticInOut(k) {
    if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k }
    return 0.5 * ((k -= 2) * k * k * k * k + 2)
}

export function quadraticIn(k) {
    return k * k
}