class Component {
    constructor(){        
        console.log(this)
    }

    fn1() {
        console.log('fn1 this....', this)
    }

    fn2 = () => {
        console.log('fn2 this....', this)
    }

    a = "a"
}

const c1 = new Component()