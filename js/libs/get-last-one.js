// 工具函数
// 获取到数组的最后一个元素
const getLastOne = arr => {
  if (toString.call(arr) !== '[object Array]') { return null }

  if (arr.length === 0) { return null }

  return arr[arr.length - 1]
}

window.getLastOne = getLastOne

export default getLastOne
