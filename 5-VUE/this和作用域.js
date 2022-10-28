"use strict";
function fn() {
    return this
}

var obj1 = { x: 1, y: 2 }

let obj2 = { x: 1, y: 2 };

console.log(fn)
console.log(obj1)
console.log(obj2)
console.log("----------------")
console.log(window.fn)
console.log(window.obj1)
console.log(window.obj2)
console.log("----------------")
console.log(fn())
console.log(window.fn())

