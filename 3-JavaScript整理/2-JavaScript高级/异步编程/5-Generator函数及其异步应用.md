### 01 Generator函数
+ 迭代器
> ---有next方法，执行返回结果对象（value，done）

```js
// 迭代代码es5
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

iterator.next();//{value:1,done:false}
iterator.next();//{value:2,done:false}
iterator.next();//{value:3,done:false}
iterator.next();//{value:undefined,done:true}
```

+ 可迭代协议 
    + [Symbol.iterator]属性
    + 内置可迭代对象  ---String、Array、Map、Set等

+ 迭代器协议
    + next方法
    + done
    + value

+ Generator函数（生成器）
    + ES6一步编程解决方案
    + 声明：通过function*声明
    + 返回值：符合可迭代协议和迭代器协议的生成器对象
    + 在执行时能暂停，又能从暂停处继续执行
+ 执行Generator函数得到生成器对象：包括
    + next(param)
    + return(param)
    + throw(param)

+ yield关键字
    + 只能出现在Generator函数中
    + 用来暂停和恢复生成器函数
+ next执行
    + 遇yield暂停，将紧跟yield表达式的值作为返回对象的value
    + 没有yield，一直执行到return，将return的值作为返回对象的value
    + 没有return，将undefined作为返回对象的value
+ next参数
    + next方法可以带一个参数，该参数被会当做上一个yield表达式的返回值
```js
// yield 例子
function* createIterator() {
    let first = yield 1;
    let second = yield first + 2;//let second = yield (first + 2);
    yield second + 3;
}
let iterator = createIterator();

iterator.next();//{value:1,done:false}
iterator.next(4);//{value:6,done:false}
iterator.next(5);//{value:8,done:false}
iterator.next();//{value:undefined,done:true}
```

+ yield*关键字   ---生成器函数/可迭代对象
> + 委托给其他可迭代对象
> + 作用：复用生成器

```js
// yield* 例子
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield 100;
  yield* generator1();
  yield 200;
}

let g2 = generator2();

g2.next();//{value:100,done:false}
g2.next();//{value:1,done:false}
g2.next();//{value:2,done:false}
g2.next();//{value:200,done:false}
g2.next();//{value:undefined,done:true}
```

+ return(param)
> 给定param值终结遍历器，param可缺省

```js
// generator return 例子
function* createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = createIterator();

iterator.next();//{value:1,done:false}
iterator.return();//{value:undefined,done:true}
iterator.next();//{value:undefined,done:true}
```

+ throw(param)
> + 让生成器对象内部抛出错误

```js
// generator throw 例子
function* createIterator() {
    let first = yield 1;
    let second;
    try {
        second = yield first + 2;
    } catch (e) {
        second = 6;
    }
    yield second + 3;
}
let iterator = createIterator();

iterator.next();//{value:1,done:false}
iterator.next(10);//{value:12,done:false}
iterator.throw(new Error("error"));//{value:9,done:false}
iterator.next();//{value:undefined,done:true}
```

+ Generator函数的应用
    + 协程
        + 一个线程存在多个协程，但同时只能执行一个
        + Generator函数式协程在ES6的实现
        + Yield挂起 x协程（交给其他协程），next唤醒 x协程


### 02 Thunk函数
+ 求值策略 传值调用，传名调用 sum(x+1,x+2)
+ thunk函数是传名调用的实现方式之一
+ 可以实现自动执行Generator函数
