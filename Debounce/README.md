# Debounce

## 介绍
手写debounce方法

## 使用
```html
<script src="../debounce.js"></script>
```

## API
```javascript
/**
 * @description: 防抖
 * @param {Function} func 执行函数
 * @param {Number} wait 延迟时间
 * @param {Boolean} immediate 立即执行
 * @return {Function}
 */
debounce(func, wait, immediate)
```

## 示例

```javascript
var app = document.getElementById('app')
var btn = document.getElementById('btn')
var action = debounce(func, wait, immediate)
app.onmousemove = action
btn.addEventListener('click', function () {
    action.cancel() // 取消防抖
})
```

