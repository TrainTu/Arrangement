## Set

* Set对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用 

```js
set() //创建新的对象
set.size //set对象中值的个数
set.add() //尾部添加一个元素
set.has()
set.clear()
set.delete()
set.entries() //返回新的迭代器对象
set.forEach(callBackFn[.thisArg])
set.has()
set.keys()
set.values()
//判断是否包含关系
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

//展开操作符展开set后跟数组一样
...new Set(myArray) === myArray //true

//数组去重
const numbers = [2, 3, 4, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 5, 32, 3, 4, 5]
console.log([...new Set(numbers)]) // [2, 3, 4, 5, 6, 7, 32]
```

## Map

* map对象保存键值对，并且能够记住见得袁术插入顺序。任何值都可以作为一个键或一个值

```js
let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';
let myMap = new Map();
// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
map.size; //3
//读取值
myMap.get(keyString) //"和键'a string'关联的值"
myMap.get('a string'); // "和键'a string'关联的值"
myMap.get(keyObj); // "和键keyObj关联的值"
myMap.get(keyFunc); // "和键keyFunc关联的值"
myMap.get({}); // undefined, 因为keyObj !== {}
myMap.get(function() {}); // undefined, 因为keyFunc !== function () {}

//将 NaN 作为 Map 的键
myMap.set(NaN, "not a number");
myMap.get(NaN); // "not a number"

//使用 for..of 方法迭代 Map
let myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
for (let [key, value] of myMap) {
    console.log(key + " = " + value); // 将会显示两个log。一个是"0 = zero"另一个是"1 = one"
}
for (let key of myMap.keys()) {
    console.log(key); // 将会显示两个log。 一个是 "0" 另一个是 "1"
}
for (let value of myMap.values()) {
    console.log(value); // 将会显示两个log。 一个是 "zero" 另一个是 "one"
}
for (let [key, value] of myMap.entries()) {
    console.log(key + " = " + value); // 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"
}

//Map 与数组的关系
let kvArray = [
    ["key1", "value1"],
    ["key2", "value2"]
];
let myMap = new Map(kvArray);
myMap.get("key1"); // "value1"
...myMap === kvArray
Array.form(myMap) === kvArray
Array.from(myMap.keys()); //["key1", "key2"]

//Map对象间可以进行合并，但是会保持键的唯一性。
// ·合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// ·展开运算符本质上是将Map对象转换成数组。
```

* WeakSet
存储弱保持对象 可垃圾回收机制回收，不容易内存泄露

* WeakMap
WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

* 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

弱引用
* 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
