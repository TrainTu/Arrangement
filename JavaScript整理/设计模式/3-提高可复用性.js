/* 01. 目的
．遵循DRY原则
．减少代码量，节省开销
02.什么是好的复用
.对象可以重复使用的
.重复代码少
.模块功能单一
03 提高复用性的设计模式 (桥接模式, 享元模式, 模板方法模式)
.桥接模式(遵循DRY原则)
通过独立方法间的桥接来形成整体功能,这样每个方法都可以被高度复用
目的:通过桥接代替耦合
应用场景:减少模块之间的耦合 */

//基本结构
//   需求:有三种形状,每种形状都有3种颜色
//   .对于三种形状,每种形状有3种颜色的需求,可以不用创建9中不同颜色的不同形状


//应用示例
//   1.需求:创建不同的选中效果:有一组菜单,上面每种选项都有不同的选中效果
//menu1,menu2,menu3
/*
function menuItem(word){
  this.word="";
  this.dom=document.createElement('div');
  this.dom.innerHTML=this.word;  
}
var menu1=new menuItem('menu1');
var menu2=new menuItem('menu2');
var menu3=new menuItem('menu3');
menu1.onmouseover=function(){
  menu1.style.color='red';
}
menu2.onmouseover=function(){
  menu1.style.color='green';
}
menu3.onmouseover=function(){
  menu1.style.color='blue';
}
menu1.onmouseout=function(){
  menu1.style.color='white';
}
menu2.onmouseout=function(){
  menu1.style.color='white';
}
menu3.onmouseout=function(){
  menu1.style.color='white';
}
*/

function menuItem(word,color){
  this.word=word;
  this.color=color;
  this.dom=document.createElement('div');
  this.dom.innerHTML=this.word;
  document.getElementById('app').appendChild(this.dom);
}

menuItem.prototype.bind=function(){
  var self=this;
  this.dom.onmouseover=function(){
     console.log(self.color);
  	this.style.color=self.color.colorOver;
  }
  this.dom.onmouseout=function(){
  	this.style.color=self.color.colorOut;
  }  
}
function menuColor(colorover,colorout){
  this.colorOver=colorover;
  this.colorOut=colorout;
}


var data=[{word:'menu1',color:['red','black']},{word:'menu2',color:['green','black']},{word:'menu3',color:['blue','black']}]
for(var i=0;i<data.length;i++){

  new menuItem(data[i].word,new menuColor(data[i].color[0],data[i].color[1])).bind();

}

//   2.Express中创建get等方法,需求:express中有get,post等等方法,有七八个,如何方便快速地创建
var methods=['get','post','delete','put'];
methods.forEach(function(method){
  app[method]=function(){
    route[method].apply(route,slice.call(arguments,1))
  }
})



/* .享元模式
提取出共有部分与私有部分,私有部分作为外部数据传入. 从而减少对象数量
目的:减少对象/代码数量
应用场景:当代码中创建了大量类似对象和类似的代码块 */
//基本结构
//   需求:有一百种不同文字的弹窗,每种弹窗行为相同,但文字和样式不同,我们没有必要新建一百个弹窗对象
//   .只需一个类,不需要new一百次弹窗
//   .这个类只保留所有弹窗共有的,每个弹窗不同的部分留作为一个公共享元


//应用示例
//   1.文件上传,需求:上传功能,可上传多个文件
function uploader(fileType,file){
	 this.fileType=fileType;
    this.file=file;
}
uploader.prototype.init=function(){
  //初始化文件上传的html
}
uploader.prototype.delete=function(){
  //删除掉该html
}
uploader.prototype.uploading=function(){
  //上传
}
var fileob1,fileob2,fileob3,fileob4
var data=[
  {
  	type:'img',
  	file:fileob1
  },
  {
  	type:'txt',
  	file:fileob2
  },
  {
  	type:'img',
  	file:fileob3
  },
  {
  	type:'word',
  	file:fileob4
  },      
]
for(var i=0;i<data.length;i++){
	new uploader(data[i].type,data[i].file);
};

//fileType,file
function uploader(){

}
uploader.prototype.init=function(){
  //初始化文件上传的html
}
uploader.prototype.delete=function(){
  //删除掉该html
}
uploader.prototype.uploading=function(filetype,file){

}
var uploader=new uploader();
for(var i=0;i<data.length;i++){
	uploader.uploading(data[i].type,data[i].file);
}

//   2.jQuery的extend.需求:extend方法,需要判断参数数量来进行不同的操作
//extends
var jQuery={};
jQuery.fn={};
jQuery.extend = jQuery.fn.extend = function() {
 /* if(arguments.length==1){
     for(var item in arguments[0]){
         this[item]=arguments[0][item]
     }
  }else if(arguments.length==2){
    for(var item in arguments[1]){
      arguments[0][item]=arguments[1][item]
    }
    return arguments[0];
  }*/
  var target=arguments[0];
  var source;
  if(arguments.length==1){
    target=this;
    source=arguments[0];
  }else if(arguments.length==2){
    target=arguments[0];
    source=arguments[1];
  }
  for(var item in source){
    target[item]=source[item]
  }
  return target;
} 


/* 
.模板方法模式
当一个功能朝着多样化发展,不放先定义一个基础的, 把具体实现延迟到后面
目的:定义一系列操作的骨架,简化后面类似操作的内容
应用场景:当项目中出现很多类似的操作内容 
*/
//基本结构
//   需求:编写一个导航组件,有的带消息提示,有的是竖着,有的是横着
//   .导航组件多种多样,可能后面还会新增类型,那么我们不妨写一个基础的组件类,然后具体的实现,延迟到具体的使用时
//应用示例
//   1.编写一个弹窗组件,需求:项目有一系列弹窗,每个弹窗的行为,大小,文字都会不同
function basePop(word,size){
  this.word=word;
  this.size=size;
  this.dom=null;
}
basePop.prototype.init=function(){
	var div=document.createElement('div');
	div.innerHTML=this.word;
	div.style.width=this.size.width+'px';
	div.style.height=this.size.height+'px';
	this.dom=div;
}
basePop.prototype.hidden=function(){
   //定义基础操作
   this.dom.style.display='none';
}
basePop.prototype.confirm=function(){
   //定义基础操作
   this.dom.style.display='none';
}
function ajaxPop(word,size){
  basePop.call(this,word,size);
}
ajaxPop.prototype=new basePop();
var hidden=ajaxPop.prototype.hidden;
ajaxPop.prototype.hidden=function(){
	hidden.call(this);
	console.log(1);
}
var confirm=ajaxPop.prototype.confirm;
ajaxPop.prototype.confirm=function(){
	confirm.call(this);
	console.log(1);
}
var pop=new ajaxPop('sendmes',{width:100,height:300});
pop.init();
pop.confirm();

var axios={get:function(){
	return Promise.resolve();
}};

//   2.封装一个算法计算器,需求:现在我们有一些列的算法,但是这个算法在不同的地方需要增加一些不同的操作
function counter(){
  this.beforeCounter=[];
  this.afterCounter=[];
}

//然后我们把具体的不同部分留到具体使用的时候去扩展
//所以我们定义两个方法来扩展
counter.prototype.addBefore=function(fn){
   this.beforeCounter.push(fn);
}
counter.prototype.addAfter=function(fn){
   this.afterCounter.push(fn);
}

//最终计算方法
counter.prototype.count=function(num){
   //结果边两
   var _resultnum=num;
   //算法队列数组组装
   var _arr=[baseCount];
   _arr=this.beforeCounter.concat(_arr);
   _arr=_arr.concat(this.afterCounter);
   //不同部分的相同算法骨架
   function baseCount(num){
     num+=4;
     num*=2;
     return num;
   }
   //循环执行算法队列
   while(_arr.length>0){
     _resultnum=_arr.shift()(_resultnum);
   }
   return _resultnum;
}
//使用
var countObject=new counter();
countObject.addBefore(function(num){
   num--;
   return num;
})
countObject.addAfter(function(num){
  num*=2;
  return num;
})
countObject.count(10);


/* 
.补充:JavaScript的组合与继承
.组合
1.JavaScript最初没有专门的继承, 所以最初JavaScript推崇函数式的编程,然后进行统一组	合桥接到一起
2.桥接模式可以看成组合的一种体现, 组合好处是耦合低, 方便方法复用, 方便扩展
.继承
1.在es6出现class和extend,继承的方式多种多样, 但是都是各有弊端
2.模板方法模式可以看成继承的一种体现, 继承的好处是可以自动获得父类的内容与接口,方便统一化
 */