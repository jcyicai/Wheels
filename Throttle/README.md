# Throttle

## 介绍
手写throttle方法

## 使用
```html
<script src="../throttle.js"></script>
```

## API
```javascript
/**
 * @description: 节流
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @return {Function}
 */
throttle(func, wait)
```

## 示例

```javascript
var app = document.getElementById('app');
app.onmousemove = throttle(func, wait)
```
