class VueComponent {
    constructor(option) {
        this.option = option
    }
}

const option = {
    data1 : {
        a1: 1,
        b1: 2,
    },
    data2(){
        return {
            a2: 1,
            b2: 2, 
        }
    },
};

const component1 = new VueComponent(obj);
const component2 = new VueComponent(obj);

console.log(component1.option.data1 === component2.option.data1) // true
console.log(component1.option.data2() === component2.option.data2()) //false

