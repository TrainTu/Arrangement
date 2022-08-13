async function test1 (){
    try {
        await f1();
        await f2();
    } catch (err) {
        console.log("try catch", err)  // 只能捕获到一个第一个错误
    }
}

async function test2 (){
    f1().then(()=>{
        f2().then(()=>{

        }).catch((err)=>{
            console.log("Promise2 then", err) // 不会执行
        })
    })
    .catch((err)=>{
        console.log("Promise1 then", err)  // 只能捕获到对应的错误
    })
}

const f1 = ()=>{
    return Promise.reject("错误1")    
}

const f2 = ()=>{
    return Promise.reject("错误2")    
}

test1()
test2()