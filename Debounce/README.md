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
 * @return {Function}
 */
debounce(func, wait)
```

## 示例

```javascript
var app = document.getElementById('app');
app.onmousemove = debounce(func, wait)
```

## 参考
underscore-debounce.js
