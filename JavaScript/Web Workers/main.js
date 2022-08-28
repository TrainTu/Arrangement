/**
 * 官方文档
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
*/


/* =============专用 worker=============== */ 
// 生成一个专用 worker
var myWorker = new Worker('./worker.js');

// 专用 worker 中消息的接收和发送
myWorker.postMessage([first.value, second.value]);
console.log('Message posted to worker');

myWorker.postMessage([first.value, second.value]);
console.log('Message posted to worker');

myWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log('Message received from worker');
}

// 终止 worker
myWorker.terminate();


/* =============共享 worker...=============== */ 