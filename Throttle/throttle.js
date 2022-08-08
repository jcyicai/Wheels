/**
 * @description: 节流 第一版
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @return {Function}
 */
function throttle(func, wait) {
    var context, args;
    var prev = 0;
    return function () {
        var now = +new Date()
        context = this
        args = arguments
        if (now - prev > wait) {
            func.apply(context, args)
            prev = now
        }
    }
}

/**
 * @description: 节流 第二版
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @return {Function}
 */
function throttle1(func, wait) {
    var context, args;
    var timer;
    return function () {
        context = this
        args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                timer = null
                func.apply(context, args)
            }, wait)
        }
    }
}