/* 目的
.面对需求变更
.减少代码修改的难度
什么是好的可扩展
.需求变更,不需要重写
.修改代码不会引起大规模变动, 低耦合
.方便加入新模块,像积木一样 */

/* 01 提高可扩展性的设计模式
001 更好的更改代码(适配器模式, 装饰者模式)
.适配器模式 --方法接口名不同的问题,数据结构不好使
当面临两个新老模块之间接口api不匹配,可以用适配来转化api.

目的:通过写一个适配器,来代替替代
应用场景:面临接口不通用的问题 */
//提取的是不同的数据-公用数据,减少重复的对象和代码块
//桥接是我提取相同操作
function f1(){
    return f2()
}
//====示例====
//1.框架的变更 
//需求:
//目前项目使用的A框架,现在改写成jQuery,
//两个框架十分类似,但是有少数几个方法不同
//思想:
//有的时候不用去修改老代码,
//我们可以通过加入一些转化代码来代替更改老代码
A.c()//=>$.css()
A.o()//=>$.on()
A.c = function () {
   return $.css()
}
A.o = function () {
   return $.on()
}

//2.数据和参数适配
//需求:
//为了避免参数不适配产生的问题,很多框架会有一个参数适配操作,
//比如适配后端参数不同格式
function balabala(){
    var _default = {
        name:""
    }
    for(var item in obj){
        _default[item] = obj[item] || _default[item]
    }
}

/* .装饰者模式 --方法功能需要扩展
当老的方法,不方便去直接修改,可以通过封装来增加功能
目的:不重写方法的扩展方法
应用场景:当一个方法需要扩展,但是又不好去修改方法 */
//有一个他人写好的模块a,内部的方法b.
//模块为他人写好的,不能修改,如何扩展b方法
var a={
    b:function(){}
}
//新建一个自己的方法,再起内部调用b方法,并且在执行自己的方法.
//这样可以在不修改源对象的情况下,扩展行为
function myB(){
    a.b()
    //要扩展的方法
}

//====示例====
//1. 扩展你的已有事件绑定
//需求:
//现在想买改造,需要给input标签已有的事件增加一些操作

//比如:删除按钮,之前只写了功能,没有确认提示
 var _old = dom.onclick;
 button.onclick = function () {//onclick重写
     old();
     console.log("提示")
 }
 
 //大量按钮需要适配时
 //适配工厂方法,并使用桥接模式
 function decorator(dom, fn){
     if(typeof dom.onclick == "function") {//健壮性
         _old();
         dom.onclick = function (){
             old();
             fn();
         }
     }
 }
 decorator(dom, function(){})
 
 //2. Vue的数组监听
 //需求:
//vue中利用defineProperty监听对象,那数组怎么办
 var arrayPrototype = Array.prototype;
 var arrayMethods = Object.creat(arrayPrototype );
 var methods = [
     "push",
     "pop"
     //...
 ]
 methods.forEach((method)=>{
     arrayMethods[method] = function () {
         var original = arrayPrototype[method]
         var _result = original.apply(this,argument)
         dep.notify();//vue监听方法
         return _result
     }
 })
 

/* 002 解耦你的方法与调用(命令模式)
.命令模式
解耦实现与具体命令,让实现端和命令端扩展的都更轻松
目的:解耦实现和调用,让双方互不干扰
应用场景:调用命令充满不确定性 */

//编辑器就是我们命令模式方法接口
//代码就是输入的命令

//webpack配置,就是命令

//方法 <- 命令层 <- 命令

//====基本结构====
//在调用与实现之间加上一层命令层action方法实现excute命令层
//示范:
    var command = (function(){
        var action= {
            
        };
        return function excute(){}
    })();
    
//====应用示例====
//1. 绘图命令
//需求:
//    封装一系列canvas绘图命令

//封装一个canvas绘图工具. 如果使用时,要画两个圆形,三个矩形,不确定
var canvasCommand = (function(){
    var action= {
        drawcircle:function(){},
        drawRect: function(){}
    };
    return function excute(commander){}
})

canvasCommand([
    {type:"Circle", radius:[2,3]},
    {type:"react", bc:[3,4,5]},
])

//典型命令模式例子:canvas,echart

//2. 绘制随机数量图片
//需求:
//    要做一个画廊,数量和排列顺序随机
var createImg = (function(){
    var action = {
        createImg: function(imgObj){
            //创建单张图片dom
        },
        createAllImg: function(){
            //创建整体画廊dom,并排序好
            var img = careatImg();
        },
        display:function () {
            //展示
        }
    }
    return function commander(command){//命令解析
        var finalHTML = action.createAllImg(command.imgArr,command.type)
        action.display(finalHTML,command.target);
    }
})();

createImg({
    imgArr:[
        {imgUrl:"XXX1",title:"XXX1"},
        {imgUrl:"XXX2",title:"XXX2"}
    ],
    type:"reverse"//排序
})