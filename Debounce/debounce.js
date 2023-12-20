/**
 * @description: 防抖
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @param {Boolean} immediate 立即执行
 * @return {Function}
 */
function debounce(func, wait, immediate) {
  var timer, result

  var debounced = function () {
    var context = this
    var args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      var callNow = !timer

      timer = setTimeout(function () {
        timer = null
      }, wait)

      if (callNow) {
        result = func.apply(context, args)
      }
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }

    return result
  }
  // 取消防抖
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
