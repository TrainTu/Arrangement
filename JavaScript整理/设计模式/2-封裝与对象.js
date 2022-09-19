/* 封装目的
·定义变量不会污染外部
·能够作为一个模块调用
·遵循开闭原则

什么是好的封装
·变量外部不可见
·调用接口使用
·留出扩展接口 

01  封装对象时的设计模式
·创建对象的模式
·工厂模式
目的：方便我们大量创建对象
应用场景：当一个对象需要经常创建的时候
例如：分页组件、弹窗组件
·建造者模式
目的：需要组合出一个全局对象
应用场景：当要创建单个、庞大的组合对象时
例如：轮播图

·保障对象只有一个
·单例模式
目的：需要确保全局只有一个对象
应用场景：为了避免重复新建，避免多个对象存在互相干扰 */

// 02  基本结构
// ·工厂模式的基本结构
//工厂模式就是写一方法，只需调用这个方法，就能拿到你要的对象
function Factory(type){
    switch(type){
        case 'type1':
            return new Type1();
        case 'type2':
            return new Type2();
        case 'type3':
            return new Type3();
    }
}

// ·建造者模式的基本结构
//把一个复杂的类各个部分，拆分成独立的类，
//然后再在最终类里组合到一块，
//final为最终给出去的类
//模块1
function Mode1(){
    
}
//模块2
function Mode2(){
    
}
function Final(){
    this.mode1 = new Mode1();
    this.mode2 = new Mode2();
}

// ·单例模式的基本结构
//通过定义一个方法，使用时只允许通过此方法拿到存在内部的同一实例化对象
let Singleton = function(name){
    this.name = name;
}
Singleton.getInstance = function(name){
    if(this.instance){
        return this.instance;
    }
    return this.instance = new Singleton(name);
}


// 03 应用示例
// ·工厂模式的示例
//多彩的弹窗
//需求：项目有个弹窗需求，弹窗有多重，他们之间存在内容和颜色上的差异
//弹窗
function infoPop(){

}
function confirmPop(){

}
function cancelPop(){

} 

function pop(type,content,color){
	if(this instanceof pop){
 		var s = new this[type](content,color);
 		return s;
	}else{
		return new pop(type,content,color);
	}
/*
   if(this instanceof pop){
	  return pop(type,content,color)
	}else{
            
	}
	function infoPop(){

	}
	function confirmPop(){

	}
	function cancelPop(){

	}	

	switch(type) {
	  case 'infoPop':
	  return new infoPop(content,color);
	  case 'confirmPop':
	  return new confirmPop(content,color);
	  case 'cancelPop':
	  return new cancelPop(content,color);
	}
*/
}
pop.prototype.infoPop=function(){
  console.log('infoPop');
}
pop.prototype.confirmPop=function(){
	console.log('confirmPop');
}
pop.prototype.cancelPop=function(){
	console.log('cancelPop');
}

//pop('infoPop','hello','red');
var data=[
  {
  	type:'infoPop',
  	content:'hello',
  	color:'red'
  },
  {
  	type:'infoPop',
  	content:'good good study',
  	color:'red'
  },  
  {
  	type:'confirmPop',
  	content:'good good study',
  	color:'green'
  },    
];
data.forEach((item)=>{
   console.log( pop(item.type,item.content,item.color));
})
data.forEach((item)=>{
   console.log(new pop(item.type,item.content,item.color));
})

//jquery

(function(){
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	}
	jQuery.fn=jQuery.prototype={
		init:function(){
			
		}
	}
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() {

	}
	jQuery.extend({

	});
    window.$=jquery;
})()


// 建造者模式的示例
//编写一个编辑器插件
//需求：有一个编辑器插件，初始化的时候需要配置大量参数，而且内部功能很多
//定义最终类
function Editor(){

}
//html初始模块
function initHtml(domStyle){
  this.template='<div style={{editorStyle}}><div></div><div><textarea style={{areaSyle}}/></div></div>';

}
initHtml.prototype.initStyle=function(){

}
initHtml.prototype.renderDom=function(){

}
//字体颜色,大小控制
function fontControll(){
  
};
fontControll.prototype.changeColor=function(){

}
fontControll.prototype.changeFontsize=function(){

}
//回滚
function stateControll(){

}
stateControll.prototype.saveState=function(){

}
stateControll.prototype.stateBack=function(){

}
stateControll.prototype.stateGo=function(){

}
window.Editor=Editor;


//Vue
function Vue (options) {
    if (!(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);


  export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// 单例模式的示例
//写一个全局数据储存对象
//需求：项目中有一个全局的数据储存者，
//这个储存者只能有一个，不然会需要进行同步，增加复杂度

//vue
function store(){
  this.store={

  }
  if(store.install){
  	return store.install;
  }
  store.install=this;
}
store.install=null;


//vue-router
let _Vue;
function install (_Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true
  
  _Vue = Vue
}
 
 



