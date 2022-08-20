* 待整理...
    - 常见微任务
        + process.nextTick ()-Node
        + Promise.then()
        + catch
        + finally
        + Object.observe
        + MutationObserver

```js
function test() {
    console.log(1)
    setTimeout(function() { // timer1    
        console.log(2)
    }, 1000)
}
test();
setTimeout(function() { // timer2  
    console.log(3)
}) new Promise(function(resolve) {
    console.log(4)
    setTimeout(function() { // timer3 
        console.log(5)
    }, 100)
    resolve()
}).then(function() {
    setTimeout(function() { // timer4 
        console.log(6)
    }, 0)
    console.log(7)
})
console.log(8)
```

+ 浏览器的EventLoop
+ NodeJS中的运行机制  --- 待查阅

#### 原文链接[https://www.toutiao.com/article/6805366747240071693/?app=news_article&timestamp=1660563579&use_new_style=1&req_id=2022081519393801021010503424034E52&group_id=6805366747240071693&share_token=A9345BD2-F8D0-4C84-9770-1C22823DD187&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1&source=m_redirect]
