01 async函数
·是什么
·一个语法糖 是异步操作更简单
·返回值是一个promise对象
·return的值是promise resolve时候的value
·throw的值是promise rejected时候的reason

```js
// resolved promise
async function test() {
    return 1;
}
const p = test();
console.log(p);
p.then(function(data) {
    console.log(data);
});

// rejected promise
async function test() {
    throw new Error("error");
}
const p = test();
console.log(p);
p.catch(function(data) {
    console.log(data);
});
```

·await
·只能出现再async函数内或最外层
·等待一个promise对象的值
·await的promise状态为rejected，后续执行中断
·await promise时：
·resolved 返回promise的值
·rejected 抛出promise的拒绝原因
·await非promise时 返回对应的值

```js
async function async1() {
    console.log("async1 start");//no1
    await async2();//no2
    console.log("async1 end")//no4
}
async function async2(){
    return Promise.resolve().then(_=>{
        console.log("async2 promise");
    })//no3
}
async1()

async function f() {
    await Promise.reject('error');//后续代买不会执行
    console.log(1);
    await 100;
}
f();

async function f() {
    await Promise.reject('error').catch(err => {
        //处理异常
    });//后续代码会执行
    console.log(1);
    await 100;
}

async function f() {
    try {
        await Promise.reject('error');
    } catch (e) {
        //处理异常
    } finally {
        
    }//后续代码会执行
    console.log(1);
    await 100;
}
```

·async函数实现原理     ----Generator + 自动执行器
```js
async function example(p){
    //...
}
//等价于
function example(param) {
    return spawn(function*(){
        //...
    })
}

function spawn(genF) {
    return new Promise(function(resolve,reject){
        const gen = genF();//生成器对象
        function step(nextF) {
            let next;
            try{
                next = nextF();//执行gen.next
            } catch (e) {
                return reject(e);
            }
            if(next.done){
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function(){
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e)
                    })
                }
            );
        }
        step(function() {
            return gen.next(undefined)
        })
    })
}
```

02 应用
//按顺序打印对个文件内容
```js
//promise
function readFilesByPromise() {
    const fs = require("fs");
    const files = [
        "/Users/kitty/testgenerator/1.json",
        "/Users/kitty/testgenerator/2.json",
        "/Users/kitty/testgenerator/3.json"
    ];
    const readFile = function(src) {
        return new Promise((resolve, reject) => {
            fs.readFile(src, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    };
    readFile(files[0])
        .then(function(data) {
            console.log(data.toString());
            return readFile(files[1]);
        })
        .then(function(data) {
            console.log(data.toString());
            return readFile(files[2]);
        })
        .then(function(data) {
            console.log(data.toString());
        });
}
// 调用
readFilesByPromise();

//async await 
async function readFilesByAsync() {
    const fs = require("fs");
    const files = [
        "/Users/kitty/testgenerator/1.json",
        "/Users/kitty/testgenerator/2.json",
        "/Users/kitty/testgenerator/3.json"
    ];
    const readFile = function(src) {
        return new Promise((resolve, reject) => {
            fs.readFile(src, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    };

    const str0 = await readFile(files[0]);
    console.log(str0.toString());
    const str1 = await readFile(files[1]);
    console.log(str1.toString());
    const str2 = await readFile(files[2]);
    console.log(str2.toString());
}
// 调用
readFilesByAsync();






