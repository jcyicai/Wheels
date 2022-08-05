/**
 * @description: 防抖
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @return {Function}
 */
function debounce(func, wait) {
    var timer;
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            func.apply(context, args)
        }, wait)
    }
}