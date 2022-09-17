### 01 浏览器的Event Loop
+ 异步实现
  + 宏观：浏览器多线程
  + 微观：Event Loop

+ 宏任务
  + script
  + setTimeout/setInterval
  + setImmediate  --属于nodejs
  + I/O
  + UI render  --UI渲染

+ 微任务
  + promise
  + Object.observe --监听对象变化
  + MutationObserver  --监听dom结构的变化
  + postMessage  --window对象之间通信的方法

+ Event Loop执行过程
  1. 首先执行script，script被称为全局任务，也属于macrotask；
  2. 当macrotask执行完以后，执行所有的微任务；
  3. 微任务全部执行完，再去取任务队列中的宏任务执行。

> 注意
>  1. 一个Event Loop有一个或多个任务队列，每个event loop有一个微任务队列
>  2. requestAnimationFrame处于渲染阶段


+ 栈

  先进后出不是赋值算进，使用算出；而是赋值算进，被清理算出。而且在同一函数作用域下的变量，应该位于栈的同一层。 */

```js
console.log("1");
setTimeout(function() {
  console.log("2");
}, 0);
Promise.resolve().then(function() {
  console.log("3");
});
console.log("4");

console.log("start");

setTimeout(() => {
  console.log("setTimeout");
  new Promise(resolve => {
    console.log("promise inner1");
    resolve();
  }).then(() => {
    console.log("promise then1");
  });
}, 0);

new Promise(resolve => {
  console.log("promise inner2");
  resolve();
}).then(() => {
  console.log("promise then2");
});

// 代码2
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  return Promise.resolve().then(_ => {
    console.log("async2 promise");
  });
}

console.log("start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});

```

### 02 node.js的Event Loop
+ 六个阶段
  1. timer：执行timer的回调
  2. pending callback：系统操作的回调
  3. idle，pepare 内部使用
  4. poll：等待新I/O事件
  5. check：执行setImmediate 回调
  6. close callback：内部使用

+ poll阶段的两个主要功能
  1. 计算应该被block多久
  2. 处理poll队列的事件

```js
 console.log(1);
 process.nextTick(() => {
   console.log("nextTick callback");
 });
 console.log(2);
//  process.abort();
 console.log(process.pid);

 setTimeout(_ => {
   console.log("setTimeout");
 }, 0);
 setImmediate(_ => {
     console.log("setImmediate");
 });

 const fs = require('fs');
 fs.readFile(__filename, _ => {
     setTimeout(_ => {
         console.log("setTimeout");
       }, 0);
       setImmediate(_ => {
          console.log("setImmediate");
       });
 });

const fs = require('fs');

function someAsyncOperation(callback) {
  fs.readFile(__dirname, callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

someAsyncOperation(() => {
  const startCallback = Date.now();
  while (Date.now() - startCallback < 200) {
    // do nothing
  }
});

 const fs = require("fs");
 fs.readFile(__filename, _ => {
   setTimeout(_ => {
     console.log("setTimeout");
   }, 0);
   setImmediate(_ => {
     console.log("setImmediate");
     process.nextTick(_ => {
        console.log("nextTick2");
       });
   });
   process.nextTick(_ => {
     console.log("nextTick1");
   });
 });

 ```





