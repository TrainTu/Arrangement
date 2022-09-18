// 一次声明多变量
var name_01 = "marry", age = 18, email = "marry@sina.com.cn", address, settings = null;
var distance = 12.67980;

var id = "16";

console.log(typeof (distance));//在控制台中打印
console.log(age - "abc");
console.log(isNaN(email));
console.log(isNaN(id));
console.log(typeof (id));//number

id = Number(id);
name_01 = Number(name_01);//NaN

console.log(typeof (name_01));