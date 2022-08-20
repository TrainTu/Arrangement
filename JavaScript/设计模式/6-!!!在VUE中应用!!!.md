原文链接:  https://juejin.cn/post/6844903760674701320

(一) 外观模式, 工厂模式
需求:
我现在要将登陆、手机注册、邮箱注册通过一个路由用参数type标识渲染那个表单；登陆过程中如果账号密码输入错误次数超过3次就需要输入图像验证码，通过codeStatus进行标识。
方案: 
Login、RegisterMobile、RegisterEmail定义了三个外观角色，每个input组件作为子系统。外观角色只关心使用那些子系统，子系统对status的逻辑在子系统内部处理，这样就降低了系统的耦合度;
进一步使用工厂模式 , 免去命名烦恼..
造一个input factory(这里指动态组件)，专门用来生成input, 调用组件传值生产不同的组件;

(二) 状态模式

需求:
在服务端输出页面的开发模式下每完成一步常规做法是跳转一个新页面到下一步，当然在SPA的开发模式下大多场景也是通过路由处理每一步的逻辑.
这整个过程是连续的，除非整个过程处理完成，否则不管进行到哪一步当刷新页面都要从第一步重新开始，也就是在同一个路由下处理这四步操作.
分析: 
第一步操作完成改变状态到第二步
第二步操作完成改变状态到第三步
第三步操作完成改变状态到第四步
方案: 
1. 首先需要一个context环境角色
<component :is="statusCom" @onChangeStatus="changeStatus" />
computed: {
      // 具体状态角色
      statusCom() {
        const statusMap = {
          1: Step1,
          2: Step2,
          3: Step3,
          4: Step4,
        } 
        return statusMap[this.status]
      }    
    },
    methods: {
      // 代表每一步的状态组件都有改变status的能力
      changeStatus(val) {
        this.status = val
      }    
    } 
///// context角色只负责具体状态的切换——渲染哪一步的组件
2. 实现State抽象状态角色
// Step1.vue
<template>
  <div>
    <!-- do something -->
    <button @click="handleClick">完成</button>
  </div>
</template>
<script>
  export default {
    methods: {
      handleClick() {
        // 第一步完成，将状态变为状态2
        // context角色接受状态改变动态渲染Step2.vue的操作
        this.$emit('onChangeStatus', 2)
      }
    }  
  }
</script>
 
///// state角色负责处理当前状态的实现和切换下一个状态——每一步逻辑的具体实现

优化:
如果这时我操作到了第3步想回退到第2步怎么办?
解决办法：
为每一次状态改变做一次缓存
// 代表每一步的状态组件都有改变status的能力
      changeStatus(val) {
        // 缓存每一次的状态变化
        this.cache.push(val)
        this.status = val
      },
      goBack() {
        // 弹出当前状态
        this.cache.pop()
        // 改变状态为上一个状态
        this.status = this.cache[this.cache.length - 1] || DEFAULT_STATUS
      }


(三) 策略模式
需求:
用户登录系统后有一个状态标记status对应4种操作提示
设计:
<!-- 根据策略规则动态渲染组件 -->
  <component :is="authCom" />
 
const AUTH_STATUS_NEED = 0
const AUTH_STAUTS_PEND = 1
const AUTH_STATUS_PASS = 2
const AUTH_STATUS_REFUSE = 3
 
data () {
    status: AUTH_STATUS_NEED // 通过请求api赋值
},
computed () {
      authCom () {
        const statusMap = {
          [AUTH_STATUS_NEED]: Need,
          [AUTH_STAUTS_PEND]: Pend,
          [AUTH_STATUS_PASS]: Pass,
          [AUTH_STATUS_REFUSE]: Refuse
        }
        // 应用策略
        return statusMap[this.status]
      }
},

总结:
状态模式：程序运行过程中不同状态之间可以随意转换
策略模式：选择一种策略执行一次


(四) 模板方法模式
// react 为例, (设计的一个缩影: 主要和通用算法逻辑在parent中, stage中只要关心细节逻辑)
class Parent {
  constructor() {}
  render () {
    <div>
      <div name="tom"></div>
      <!-- 算法过程：children要渲染在name为joe的div中 -->
      <div name="joe">{this.props.children}</div>
    </div> 
  }
}
class Stage {
  constructor() {}
  render () {
    // 在parent中已经设定了children的渲染位置算法
    <Parent>
      // children的具体实现
      <div>child</div>
    </Parent> 
  }  
}
 
// vue为例
// parent.vue
<template>
  <div>
    <div name="tom"></div>
    <div name="joe">
      <!--vue中的插槽渲染children-->
      <slot />
    </div>
  </div>
</template>
// stage.vue
<template>
  <div>
    <parent>
      <!-- children的具体实现 -->
      <div>child</div>
    </parent>
  </div>
</template>


(五) 享元模式
实现相同或者相似对象的代码共享
需求: 
toast组件
分析:
交互方式——弹出、隐藏，由共享对象所拥有
提示icon、背景样式、字体样式提供接口可配置
使用api统一
总结：
有男女衣服各50套，现在要给这些衣服拍照怎么办呢？

土豪做法：new 100个模特对象一人穿一套慢慢拍，有钱任性（内存占有率高）
理性做法：new 一个男模特和一个女模特拍完一套换一套接着拍（暴露一个换衣服的接口），
         也没差，主要是省钱（对象从100个减少为2个）


(六) 观察者模式
vue原理都知道通过Object.defineProperty 拦截数据的 get/set ，在get中收集依赖Watcher，在set中触发更新Watcher.notify()，这里就是观察者模式的应用
场景:
+ 两个form表单——发票信息和邮寄信息
+ 邮寄信息表单只在选中增值税专用发票时才需要
+ 提交按钮需在所有存在的表单（一个或者两个）验证通过后才有效，也就是在点击提交按钮后获取表单的验证结果和输入框的值
分析:
将表单对象（组件）作为观察者，点击提交按钮notify所有观察者（表单）获取值
// 两个表单
async handleSubmit () {
     // 已知有invoice和post两个观察者
     let invoice = await this.$refs.invoice.getValue()
     let post = {}
     if (this.$refs.post) {
         post = await this.$refs.post.getValue()
     }
     this.$axios.post({
         invoice,
         post
     })
   }
 
// 无限添加表单
async handleSave () {
        // 伪代码
        try {
          // this.$refs.contacts是一个数组
          const promises = this.$refs.contacts.map(contact => contact.getValue())
          const contacts = await Promise.all(promises)
          this.$axios.post({
            contacts
          })
        } catch (error) {
          // 表单验证不通过
          console.dir(error)
        }
      }


(七) 
(1)适配器模式
适配器相当于和事佬: 两口插座转三口, android充电线接口转iphone
/ Swiper.vue
// 项目原本使用的Swiper组件会被替换掉，我们自己封装一个Swiper组件
<template>
  <!-- 进行转换 -->
  <nb-swiper :prop-x="propX" :prop-yy="propZ" :prop-z="propW" />
</tempalte>
(2)装饰者模式
// 原生input需要验证功能，我们用带有验证能力的valid-input包裹
<valid-input>
  <input v-model="username" type="text" />
</valid-input>
(3) 代理模式
懵懂骚年喜欢一位漂亮姑凉

装饰者模式：不管这位姑凉怎么化妆，穿长袖还是短袖（装饰）骚年每次远观看到的终究是姑凉本人

代理模式：骚年按奈不住躁动的心要开始行动了，骚年想到了一个方法首先策反姑凉的好友闺蜜作
        为自己的代理达传达一些小纸条什么的，小纸条最终有没有送到姑凉手中骚年并不能确认
        ，可是少年依旧通宵写着纸条。参见电影《你好,之华》年轻之华
场景:
数据不为空——进行列表显示
数据为空——显示数据为空的提示
// list.vue
...
//// List组件做了两件事：数据为空的处理、数据不为空的处理，这种设计是不太友好

// ProxyList.vue
<template>
 <div>
   <empty v-if="isEmpty" />
   <list v-else :data="data" />
 </div>
</tempalte>
/// 数据data的使用者来说，只需关心拿数据渲染列表，数据为空是什么样的完全不关心

