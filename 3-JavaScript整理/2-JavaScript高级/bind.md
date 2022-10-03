

``````JS
const obj = {
    fn(){
        console.log("this指向->",this)
    }
}

const f1 = obj.fn;
const f2 = obj.fn.bind(obj)

f1() // this指向-> window
f2() // this指向-> obj
```

