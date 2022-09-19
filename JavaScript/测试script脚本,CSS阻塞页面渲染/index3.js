const cur3 = new Date().getTime();
while (new Date().getTime() - cur3 < 2000) {
    console.log("等待2秒...")
}
const newDiv3 = document.createElement("div")
newDiv3.innerText = "2s后 我是脚本插入的div6"
const div7 = document.getElementById("div7");
document.body.insertBefore(newDiv3, div7);
console.log("=======脚本2执行完毕========")
