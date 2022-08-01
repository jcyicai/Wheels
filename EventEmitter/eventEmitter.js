class EventEmitter {
    constructor() {
        // 存放注册的事件和回调
        this._events = {}
    }

    /**
     * @description: 验证回调是否是函数
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
     * @description: 查找回调数组中是否包含此回调
     * @param {Array} listeners 回调数组
     * @param {Function} listener 回调
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
     * @param {Function} listener 事件回调
     * @return {Object} 可链式调用
     */
    on(eventName, listener) {
        if (!eventName || !listener) {
            // 事件名称 或 事件回调 其中一个不存  直接 return
            return
        }

        if (!this.isValidListener(listener)) {
            // 事件回调必须是个函数
            throw new TypeError('listener must be a function')
        }

        let events = this._events  // 事件合集
        let listeners = events[eventName] = events[eventName] || []  // 事件对应的回调合集
        let listenerIsWrapped = typeof listener === 'object' // 判断回调是否是对象

        if (this.indexOfListener(listeners, listener) === -1) {
            // 不重复添加回调
            listeners.push(listenerIsWrapped ? listener : {
                listener,
                once: false
            })
        }

        return this
    }

    /**
     * @description: 添加事件，该事件仅被执行一次
     * @param {eventName} 事件名称
     * @param {listener} 事件回调
     * @return {Object} 可链式调用
     */
    once(eventName, listener) {
        return this.on(eventName, { listener, once: true })
    }

    /**
     * @description: 删除事件
     * @param {eventName} 事件名称
     * @param {listener} 事件回调
     * @return {Object} 可链式调用
     */
    off(eventName, listener) {
        const listeners = this._events[eventName]
        if (!listeners) {
            return
        }

        // 遍历当前事件回调合集  如果匹配到，直接删除
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
     * @description: 删除某一事件的所有回调
     * @param {eventName} 事件名称
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
     * @param {Array} args 事件回调参数
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
                    // 如果该回调只执行一次，则执行完后 移除该回调
                    this.off(eventName, item.listener)
                }
            }
        })

        return this
    }
}