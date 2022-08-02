class EventEmitter {
    constructor() {
        // 存放注册的事件和事件监听器
        this._events = {}
    }

    /**
     * @description: 验证监听器是否是函数
     * @return {Boolean}
     */
    isValidListener(listener) {
        if (typeof listener === 'function') {
            return true
        } else if (listener && typeof listener === 'object') {
            return this.isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * @description: 查找监听器数组中是否包含此监听器
     * @param {Array} listeners 监听器数组
     * @param {Function} listener 监听器函数
     * @return {Number} 如果没有找到 返回 -1
     */
    indexOfListener(listeners, listener) {
        let result = -1
        listener = typeof listener === 'object' ? listener.listener : listener
        for (let i = 0; i < listeners.length; i++) {
            let item = listeners[i]
            if (item.listener === listener) {
                result = i
                break;
            }
        }
        return result
    }

    /**
     * @description: 添加事件
     * @param {String} eventName 事件名称
     * @param {Function} listener 监听器函数
     * @return {Object} 可链式调用
     */
    on(eventName, listener) {
        if (!eventName || !listener) {
            // 事件名称 或 监听器 其中一个不存  直接 return
            return
        }

        if (!this.isValidListener(listener)) {
            // 监听器必须是个函数
            throw new TypeError('listener must be a function')
        }

        const events = this._events  // 事件合集
        const listeners = events[eventName] = events[eventName] || []  // 事件对应的监听器合集
        const listenerIsWrapped = typeof listener === 'object' // 判断监听器是否是对象

        if (this.indexOfListener(listeners, listener) === -1) {
            // 不重复添加监听器
            listeners.push(listenerIsWrapped ? listener : {
                listener,
                once: false
            })
        }

        return this
    }

    /**
     * @description: 添加事件，该事件仅被执行一次
     * @param {String} eventName 事件名称
     * @param {Function} listener 监听器函数
     * @return {Object} 可链式调用
     */
    once(eventName, listener) {
        return this.on(eventName, { listener, once: true })
    }

    /**
     * @description: 删除某一事件的监听器
     * @param {String} eventName 事件名称
     * @param {Function} listener 监听器函数
     * @return {Object} 可链式调用
     */
    off(eventName, listener) {
        const listeners = this._events[eventName]
        if (!listeners) {
            return
        }

        // 遍历当前监听器合集  如果匹配到，直接删除
        for (let i = 0; i < listeners.length; i++) {
            let item = listeners[i]
            if (item && item.listener === listener) {
                listeners.splice(i, 1)
                break
            }
        }

        return this
    }

    /**
     * @description: 删除某一事件的所有监听器
     * @param {String} eventName 事件名称
     */
    allOff(eventName) {
        if (eventName && this._events[eventName]) {
            this._events[eventName] = []
        } else {
            this._events = {}
        }
    }

    /**
     * @description: 事件触发
     * @param {String} eventName 事件名称
     * @param {Array} args 监听器参数
     * @return {Object} 可链式调用
     */
    emit(eventName, ...args) {
        const listeners = this._events[eventName]
        if (!listeners) {
            return
        }

        // 遍历该事件的回调合集
        listeners.forEach(item => {
            if (item) {
                item.listener(...args)
                if (item.once) {
                    // 如果该监听器只执行一次，则执行完后 移除该监听器
                    this.off(eventName, item.listener)
                }
            }
        })

        return this
    }
}