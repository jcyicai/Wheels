function JcNew() {
    /**
     * new过程：
     * 创建一个新对象
     * 将构造函数的作用域赋给新对象（因此this 就指向了这个新对象）
     * 执行构造函数中的代码（为这个新对象添加属性）
     * 返回新对象
     */

    var obj = new Object(); // 创建一个新对象

    var constructor = Array.prototype.shift.call(arguments); // 调用数组shift方法，获取arguments类数组的第一个值 即 传入的构造器函数

    obj.__proto__ = constructor.prototype // 将构造函数的作用域赋给新对象（因此this 就指向了这个新对象）

    var result = constructor.apply(obj, arguments); // 执行构造函数中的代码（为这个新对象添加属性）

    return typeof result === 'object' ? result : obj // 返回新对象

}