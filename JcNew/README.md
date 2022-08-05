# JcNew

## 介绍
手写new方法

## 使用
```html
<script src="../jcNew.js"></script>
```

## API
```javascript
/**
 * @param {Function} constructor 构造函数
 * @param {*} args 参数
 */
const person = JcNew(constructor, ...args)
```

## 示例

```javascript
// Person 构造函数
function Person(name) {
    this.name = name
}

var person = JcNew(Person, 'Jason Chen') // 生成Person实例
console.log(person) // Person {name: 'Jason Chen'} 返回Person实例
console.log(person.name) // Jason Chen 返回Person实例 name属性值
```

## 参考
JavaScript高级程序设计(第三版) 145页
