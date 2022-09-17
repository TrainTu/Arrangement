01 promise规范/A+  
>要求  //https://www.jianshu.com/p/e0f91e03d6c1

###术语
+ promise：    一个有then方法的对象或函数，行为符合本规范
+ thenable： 一个定义了then方法的对象或函数
+ 值，value： 任何JavaScript的合法值
+ 异常，exception：throw语句抛出的值
+ 拒绝原因，reason：一个表示promise被拒绝原因的值

### promise的状态
+ pending
+ fulfilled
+ rejected

### then方法
> const promise2  = promise1.then(onFulfilled, onRejected); 

+ then方法的参数
    + 两个参数
    + onFulfilled再promise1完成后被调用，onRejected再promise1被拒绝执行后调用
    + 只被调用一次
+ then方法的调用：
    + 可以调用多次
+ then方法的返回值：
    + promise

### promise的解析过程
> 抽象模型 resoleve(promise, x)

+ 如果promise和X指向相同的值
+ 如果x是一个promise
+ 如果x是一个对象或一个函数
+ 如果x不是对象也不是函数

```js
//代码执行
```

```js
// 片段1
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});

promise.then(() => {
    console.log(3);
});
console.log(4);

const promise = Promise.
resolve(1).
then(2).
then(Promise.resolve(3)).
then(console.log);
//等价于
const promise1 = Promise.resolve(1);
const promise2 = promise1.then(2);
const promise3 = promise2.then(Promise.resolve(3));
const promise4 = promise3.then(console.log); //1
```

02 ES6 Promise API

```js
//Promise构造函数
new Promise(function(resolve,reject){//函数作为参数
    resolve(value)//resolve函数将promise状态从pending变成resolved(fulfilled)
    reject(reason)//reject函数将promise状态从pending变成rejected
})

//Promise静态方法
Promise.resolve(param)//等同于new Promise(function(resolved,reject){resolved(param)})
Promise.reject(reason)//等同于new Promise(function(resolved,reject){reject(reason)})
Promise.all() // 全部fulfilled最终才是fulfilled
Promise.allSettled() // 全部状态改变, 不管成功或失败, 最终返回fulfilled
Promise.race() // 根据第一个返回的状态决定最终的返回的状态, 赛跑

//Promise实例方法 
promise.then(onfulfilled,onRejected)//Promise状态改变之后的回调，返回新的promise对象
promise.catch(function(reason){})//同promise.then(null,onRejected),promise状态为rejected的回调
promise.finally(function(reason){})//同promise.then(function(function(){},function(){})),不管promise状态如何都会执行

```

+ 注意点
    1. then、catch返回的promise是新的promise，不是原来的promise
    2. Promise对象的错误会“冒泡”，直到被捕获位置，错误会被下一个catch语句捕获

### 03 Promise实践
+ 最佳实践
    + 不要忘记catch捕获错误
    + then方法中使用return
    + 传递函数给then方法
    + 不要把promise写成嵌套

> 需求: 3秒之后面一次红灯，再过2秒之后两一次绿灯，再过1秒面一次黄灯，用promise实现多次交替亮灯的效果 (console.log模拟亮灯)

> 拆解：
> 1. 多少秒后亮莫格颜色的灯
> 2. 按顺序两一批灯
> 3. 循环顺序亮一批灯

```js
function light(color, second) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log(color);
            resolve();
        }, second * 1000);
    })
}

function orderLights(list) {
    let promise = Promise.resolve();
    list.forEach(item => {
        promise = promise.then(function() {
            return light(item.color, item.second);
        });
    })
    promise.then(function() {
        return orderLights(list);
    });
}
orderLights([{
    color: 'red',
    second: 3,
}, {
    color: 'green',
    second: 2,
}, {
    color: 'yellow',
    second: 1,
}])
```

### Promise实现
> 根据Promise/A+规范实现promise，使用promises-aplus/pomises-tests插件验证

> 1. 步骤一：了解promise规范
> 1. 步骤二：实现
> 1. 步骤三：测试

```js
const statusMap = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
}; 
// 将promise设置为fulfilled状态
function fulfilledPromise(promise, value) { 
    // 只能从pending状态转换为其他状态  
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.FULFILLED;
    promise.value = value;
    runCbs(promise.fulfilledCbs, value);
} 
// 将promise设置为rejected状态
function rejectedPromise(promise, reason) { 
    // 只能从pending状态转换为其他状态  
    if (promise.status !== statusMap.PENDING) {
        return;
    }
    promise.status = statusMap.REJECTED;
    promise.reason = reason;
    runCbs(promise.rejectedCbs, reason);
}

function runCbs(cbs, value) {
    cbs.forEach((cb) => cb(value));
}

function isFunction(fn) {
    return (
        Object.prototype.toString.call(fn).toLocaleLowerCase() === "[object function]"
    );
}

function isObject(obj) {
    return (
        Object.prototype.toString.call(obj).toLocaleLowerCase() === "[object object]"
    );
}

function isPromise(p) {
    return p instanceof Promise;
} 
// promise的解析
function resolvePromise(promise, x) { 
    // x 与promise相同  
    if (promise === x) {
        rejectedPromise(promise, new TypeError("cant be the same"));
        return;
    } 
    // x 是promise  
    if (isPromise(x)) {
        if (x.status === statusMap.FULFILLED) {
            fulfilledPromise(promise, x.value);
            return;
        }
        if (x.status === statusMap.REJECTED) {
            rejectedPromise(promise, x.reason);
            return;
        }
        if (x.status === statusMap.PENDING) {
            x.then(() => {
                fulfilledPromise(promise, x.value);
            }, () => {
                rejectedPromise(promise, x.reason);
            });
            return;
        }
        return;
    }

    if (isObject(x) || isFunction(x)) {
        let then;
        let called = false;
        try {
            then = x.then;
        } catch (error) {
            rejectedPromise(promise, error);
            return;
        }
        if (isFunction(then)) {
            try {
                then.call(
                    x, (y) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise, y);
                    }, (r) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        rejectedPromise(promise, r);
                    }
                );
            } catch (error) {
                if (called) {
                    return;
                }
                called = true;
                rejectedPromise(promise, error);
            }
            return;
        } else {
            fulfilledPromise(promise, x);
            return;
        } 
    // x不是对象或者函数
    } else {
        fulfilledPromise(promise, x);
        return;
    }
}
class Promise {
    constructor(fn) {
        this.status = statusMap.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.fulfilledCbs = []; // then fulfilled callback    
        this.rejectedCbs = []; // then rejected callback
        fn((value) => { // fulfilledPromise(this, value);
            resolvePromise(this, value);
        }, (reason) => {
            rejectedPromise(this, reason);
        });
    } // 两个参数  
    then(onFulfilled, onRejected) {
        const promise1 = this;
        const promise2 = new Promise(() => {});
        if (promise1.status === statusMap.FULFILLED) {
            if (!isFunction(onFulfilled)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onFulfilled(promise1.value);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            }, 0);
        }
        if (promise1.status === statusMap.REJECTED) {
            if (!isFunction(onRejected)) {
                return promise1;
            }
            setTimeout(() => {
                try {
                    const x = onRejected(promise1.reason);
                    resolvePromise(promise2, x);
                } catch (error) {
                    rejectedPromise(promise2, error);
                }
            }, 0);
        }
        if (promise1.status === statusMap.PENDING) {
            onFulfilled = isFunction(onFulfilled) ?
                onFulfilled :
                (value) => {
                    return value;
                };
            onRejected = isFunction(onRejected) ?
                onRejected :
                (err) => {
                    throw err;
                };
            promise1.fulfilledCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(promise1.value);
                        resolvePromise(promise2, x);
                    } catch (error) {
                        rejectedPromise(promise2, error);
                    }
                }, 0);
            });
            promise1.rejectedCbs.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(promise1.reason);
                        resolvePromise(promise2, x);
                    } catch (error) {
                        rejectedPromise(promise2, error);
                    }
                }, 0);
            });
        }
        return promise2;
    }
}
// 测试用到的钩子
Promise.deferred = function() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};
module.exports = Promise;
```