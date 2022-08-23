/* 
01 提高代码质量的目的
.高质量的代码,方便后续的一切操作
.方便他人阅读
02 什么是代码质量
.代码整洁
.结构规整,没有漫长的结构
.阅读好理解
03 提高代码质量(策略模式/状态模式, 外观模式)
.策略模式/状态模式
策略/状态模式的目的:优化if-else分支
策略/状态模式的应用场景:当代码if-else分支过多时
 */

//策略模式基本结构
//   假如要编写一个计算器,有加减乘除,我们可以把一层一层的if判断,变成这样的形式


//状态模式基本结构
//   为了减少if-else结构,将判断变成对象内部的一个状态,通过对象内部的状态改变,让其拥有不同行为


//应用示例:
//    动态的内容,需求:项目有一个动态的内容,根据用户权限不同,显示不同的内容
function showPart1(){
	 console.log(1);
 }
 function showPart2(){
	console.log(2);
}
function showPart3(){
	console.log(3);
}
/*
axios.get('xxx').then((res)=>{
	 if(res=='boss'){
		 showPart1();
		 showPart2();
		 showPart3();
	 }else if(res=='manner'){
		showPart1();
		showPart2();		 
	 }else if(res=='staff'){
		showPart3();
	 }
})  
*/


 function showControl(){
	this.status='';
    this.power={
	  boss:function(){
		showPart1();
		showPart2();
		showPart3();		  
	  },
	  manner:function(){
		showPart1();
		showPart2();
	  },
	  staff:function(){
		showPart3();
	  }
	}
 }
 showControl.prototype.show=function(){
	 var self=this;
	 axios.get('xxx').then((res)=>{
		 self.status=res;
		 self.power[self.status]();
	 })
 }
 new showControl().show();

//    复合运动,需求:有一个小球,可以控制它左,右,左前,右前等移动
//复合运动
 /*
 function mover(){
   if(arguments.length==1){
	   if(arguments[0]=='left'){
         moveLeft();
	   }else if(arguments[0]=='right'){
		 moveRight();
	   }else if(arguments[0]=='top'){
		 moveTop();
	   }else if(arguments[0]=='bottom'){
		 moveBottom();
	   }
   }else{
	   if(arguments[0]=='left'&&arguments[1]=='top'){
		 moveLeft();
		 moveTop();
	   }else if(arguments[0]=='right'&&arguments[1]=='bottom'){
		 moveRight();
		 moveBottom();
	   }
	   //....
   }
 }*/

 
 function moveLeft(){
  console.log('left')
 }
 function moveRight(){
	console.log('RigmoveRight')	 
}
function moveTop(){
	console.log('Top')	 
}
function moveBottom(){
	console.log('bomoveBottom')	 
} 
 function mover(){
	 this.status=[];
	 this.actionHandle={
		left:moveLeft,
		right:moveRight,
		top:moveTop,
		bottom:moveBottom
	 }
 }
 mover.prototype.run=function(){
	 this.status=Array.prototype.slice.call(arguments);
	 this.status.forEach((action)=>{
		 this.actionHandle[action]();
	 })
 }
 new mover().run('left','right');

/* 
.外观模式
外观模式的目的:通过为多个复杂的子系统提供一个一致的接口
外观模式的应用场景:当完成一个操作,需要操作多个子系统,不同提供一个更高级的
 */

//基本结构
//   .我们在组织非法模块时,可以细化多个接口,但是我们给别人使用时,要合为一个接口,就像你可以直接去餐厅点套餐

function Module1(){} // 模块1
function Module2(){} // 模块2
function use(){
    Module2(Module1());//功能有Module1获取Module2的结果来完成
}

//应用示例: 
//   插件封装规律,需求:插件基本上都会给最终使用提供一个高级接口
//选项卡插件
function tab(){
  this.dom=null
}
tab.prototype.initHTML=function(){

}
tab.prototype.changeTab=function(){
      
}
tab.prototype.eventBind=function(){
   var self=this;
   this.dom.onclick=function(){
     self.changeTab();
   }
}
tab.prototype.init=function(config){
  this.initHTML(config);
  this.eventBind();
}

//   封装成方法的思想,需求:在兼容时代,我们会常常需要检测能力,部分作为一个统一的接口
function addEvent(dom,type,fn){
  if(dom.addEventListener){
  	dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
  	dom.attachEvent('on'+type,fn)
  }else{
  	dom['on'+type]=fn
  }
}

/* 
04 优化代码操作的设计模式(迭代器模式, 备忘录模式)
.迭代器模式
迭代器模式的目的:不访问内部的情况下,方便的遍历数据
应用场景:当我们要对 某个对象进行操作,但又不能暴露内部
 */


//基本结构
//   .在不暴露对象内部结构的同时,可以顺序的访问对象内部的,可以帮助我们简化循环,简化数据操作
function Iterator (item){
    this.item=item;
}
Iterator.prototype.dealEach = function(fn){
    for(var i=0;i<this.item.length;i++){
        fn(this.item[i],i)
    }
}

//应用示例: 
//   构建一个自己的forEach,需求,forEach方法其实是一个典型的迭代器方法
function Iterator(data){
  this.data=data;
}
Iterator.prototype.dealEach=function(fn){
  if(this.data instanceof Array){
     for(var i=0;i<this.data.length;i++){
       fn(this.data[i],i)
     }
  }else{
     for(var item in this.data){
       fn(this.data[item],item)
     }
  }
}

//   给你的项目数据添加迭代器,需求:项目项目会经常对于后端数据进行遍历操作,不如封装一个迭代器遍历的更方便
var data=[{num:1},{num:2},{num:3}]
function i(data){
    function Iterator(data){
      this.data=data;
    }
    Iterator.prototype.getHasSomenum=function(handler,num){
       var _arr=[];
       var handleFn;
       if(typeof handler=='function'){
         handleFn=handler;
       }else{
         handleFn=function(item){
             if(item[handler]==num){
                return item;
             }
         }
       }
       for(var i=0;i<this.data.length;i++){
          var _result=handleFn.call(this,this.data[i])
          if(_result){
            _arr.push(_result);  
          }
          
       }
       return _arr;
    }
    return new Iterator(data);
}
//i(data).getHasSomenum('num',1);
i(data).getHasSomenum(function(item){
  if(item.num-1==2){
      return item;
  }
});



/* 
.备忘录模式
目的:记录状态,方便回滚
应用场景:系统状态多样,为了保证状态回滚方便,记录状态
 */
//基本结构
//   .记录对象内部的状态,当需要时回滚到之前的状态,或者方便对象使用
function Memento(){
    var cache = {};
    return function(cacheName){
        if(cache[cacheName]){
           //有缓存的操作
        }else{
            //没有缓存的操作
        }
    }
}
var MementoFn = Memento();
MementoFn('xxx')


//应用示例:
//   文章页缓存,需求:项目有一个文章页需求,现在进行优化,如果上一篇已经读取过了,则不进行请求,否则请求文章数据
function pager(){
  var cache={};
  return function(pageName){
     if(cache[pageName]){
         return cache[pageName];
     }else{
         axios.get(pageName).then((res)=>{
           cache[pageName]=res;
         })
     }
  }
}
var getpage=pager();
getpage('pageone');

//    前进后退功能,需求:开发一个可以的的div,拥有前进后退功能回滚到之前的位置
function moveDiv(){
    this.stateList=[];
    this.nowState=0;
}
moveDiv.prototype.move=function(type,num){
    moveDiv(type,num);
    this.stateList.push({
     type:type,
     num:num
    });
    this.nowState=this.stateList.length-1;
}
moveDiv.prototype.go=function(){
  var _state;
  if(this.nowState<this.stateList.length-1){
      this.nowState++;
      _state=this.stateList[this.nowState];
      moveDiv(_state.type,_state.num);
  } 
}
moveDiv.prototype.back=function(){
    var _state;
    if(this.nowState>=0){
        this.nowState--;
        _state=this.stateList[this.nowState];
        moveDiv(_state.type,_state.num);
    }
}

function Memento(){
    var cache={};
    return function(cacheName){
      if(cache[cacheName]){
        //有缓存的操作的
      }else{
        //没缓存的操作
      }
    }
}
var MementoFn=Memento();
MementoFn('xxx')



