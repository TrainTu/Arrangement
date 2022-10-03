const cur2 = new Date().getTime();
while (new Date().getTime() - cur2 < 2000) {
    console.log("等待2秒...")
}
const newDiv2 = document.createElement("div")
newDiv2.innerText = "2s后 我是脚本插入的div4"
const div5 = document.getElementById("div5");
document.body.insertBefore(newDiv2, div5);
console.log("=======脚本2执行完毕========")
