grid布局：http://www.ruanyifeng.com/blog/2020/08/five-css-layouts-in-one-line.html

+ 空间居中：
``` css
.container {
    display: grid;
    place-items: center  |  start  |  end
} 
```

+ 并列自适应宽度：
```css
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}q
.item{
   flex: 0 1 150px;
   margin: 5px;
}
```

+ 两栏布局：
``` css
.container {
    display: grid;
    grid-template-columns: minmax(150px, 25%) 1fr;
}
```

三明治布局：
``` css
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
```

圣杯布局：
``` html
<div class="container">
    <header/>
    <div/>
    <main/>
    <div/>
    <footer/>
</div>
```
``` css
.container {
    display: grid;
    grid-template: auto 1fr auto / auto 1fr auto;
}
```