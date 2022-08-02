# EventEmitter

## 介绍
一个简单的事件模型，实现事件的订阅与发布

## 使用
```html
<script src="../eventEmitter.js"></script>
```

## API
```javascript
const emitter = new EventEmitter()
```

### on
添加事件，支持链式调用

```javascript
/**
 * @param {String} eventName 事件名称
 * @param {Function} listener 事件回调
 */
emitter.on(eventName, listener)
```

### once
添加事件，该事件仅被执行一次，支持链式调用

```javascript
/**
 * @param {String} eventName 事件名称
 * @param {Function} listener 事件回调
 */
emitter.once(eventName, listener)
```

### off
删除某一事件的监听器，支持链式调用

```javascript
/**
 * @param {String} eventName 事件名称
 * @param {Function} listener 事件回调
 */
emitter.off(eventName, listener)
```

### allOff
删除某一事件的所有监听器

```javascript
/**
 * @param {String} eventName 事件名称
 */
emitter.allOff(eventName)
```

### emit
触发事件，支持链式调用

```javascript
/**
 * @param {String} eventName 事件名称
 * @param {Array} args 监听器参数
 */
emitter.emit(eventName, ...args)
```

## 示例

### 添加、触发、删除事件

```javascript
// 创建实例
const emitter = new EventEmitter()

// cb监听器
const cb = function (a, b) {
    console.log(a + b)
}

// foo监听器
const foo = function () {
    console.log('foo')
}

// 先注册 再执行 再移除
emitter.on('click', cb).emit('click', 1, 2).off('click', cb)

emitter.on('blur', foo) // 注册blur事件 添加foo监听器
emitter.emit('blur') // 执行blur事件
emitter.off('blur', foo) // 移除blur事件的 foo监听器
```

## 参考
[EventEmitter.js](https://github.com/Olical/EventEmitter)

[Wheels-EventEmitter.js](https://github.com/mqyqingfeng/EventEmitter)
