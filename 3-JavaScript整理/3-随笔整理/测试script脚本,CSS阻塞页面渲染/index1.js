debugger
const cur1 = new Date().getTime();
while (new Date().getTime() - cur1 < 2000) {
    console.log("等待2秒...")
}
const newDiv1 = document.createElement("div")
newDiv1.innerText = "2s后 我是脚本插入的div2"
const div3 = document.getElementById("div3");
document.body.insertBefore(newDiv1, div3);
console.log("=======脚本1执行完毕========")