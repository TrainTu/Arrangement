// 工厂模式
function Pop(type, content, color) {
    
    if (this instanceof Pop) {
        console.log("111")
        var s = new this[type](content, color);
        return s;
    } else {
        console.log("222")
        return new Pop(type, content, color);
    }
}
Pop.prototype.infoPop = function (content, color) {
    this.color = color;
    this.content = content;
    console.log('infoPop');
}
Pop.prototype.confirmPop = function () {
    console.log('confirmPop');
}
Pop.prototype.cancelPop = function () {
    console.log('cancelPop');
}


const pop = new Pop('infoPop','hello','red');
console.log(pop)

// var data = [
//     {
//         type: 'infoPop',
//         content: 'hello',
//         color: 'red'
//     },
//     {
//         type: 'confirmPop',
//         content: 'good good study',
//         color: 'yellow'
//     },
//     {
//         type: 'cancelPop',
//         content: 'good good study',
//         color: 'green'
//     },
// ];
// data.forEach((item) => {
//     const pop = Pop(item.type, item.content, item.color)
//     console.log(pop);
// })
// data.forEach((item) => {
//     const pop = new Pop(item.type, item.content, item.color)
//     console.log(pop);
// })