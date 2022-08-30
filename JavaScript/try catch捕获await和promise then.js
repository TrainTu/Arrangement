const p1 = () => new Promise((r,j)=>{
    console.log(1)
    r(1)
})

const p2 = () => new Promise((r,j)=>{
    console.log(2)
    j(2)
})

const p3 = () => new Promise((r,j)=>{
    console.log(3)
    j(3)
})

async function testAwait(){
    try {
        const r1 = await p1();
        const r2 = await p2();
        const r3 = await p3();
    } catch (err) {
        console.log("错误捕获",err)
    }    
}

function testThen(){
    p1().then(()=> p2()).then(()=> p3()).catch((err)=>{
      console.log("错误捕获",err)
    })
}



testAwait()
testThen()