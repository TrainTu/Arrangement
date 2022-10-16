# css清除浮动的四种方法(详细)
https://blog.csdn.net/weixin_45842954/article/details/125081389

 1. 在浮动元素后面添加一个标签 (不推荐使用)
 1. 给父盒子添加 overflow: hidden(触发BFC) 不推荐使用
 1. 使用伪元素清除浮动 (推荐)

### CSS中的BFC详解：定义、触发方式及应用场景  
https://blog.csdn.net/qq_53225741/article/details/124960974


```html
<div class="app1 clear">
    <div class="child1">child1</div>
    <div class="child2">child2</div>
    <div class="child3"></div>
</div>

<div class="app2">
    <div class="child1">child1</div>
    <div class="child2">child2</div>
    <div class="child3"></div>
</div>


<style>
    .app1{
        /* overflow: hidden; */
        /* float: left; */
        /* position: absolute; */
        /* display: flex; */
        width: 400px;
        background-color: brown;
    }
    .clear::after{
        content: "";
        display: block;
        clear: both;
    }
    .app1 .child1{
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        float: left;
    }
    .app1 .child2{
        width: 50px;
        height: 100px;
        background-color: aqua;
        float: left;
    }
    .app1 .child3{
        /* clear: both; */
    }

    .app2{
        display: flow-root;
        margin-top: 40px;
        width: 400px;
        background-color: brown;
    }
    .app2 .child1{
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        margin-bottom: 40px;
    }
    .app2 .child2{
        width: 50px;
        height: 100px;
        background-color: aqua;
        margin-top: 10px;
    }
    .app2 .child3{
        /* clear: both; */
    }

</style>
```