原文链接: 

上  <https://www.cnblogs.com/wenruo/p/11100537.html>

下  <https://www.cnblogs.com/wenruo/p/15088807.html>

## 常用函数

```JS
const _max = Math.max.bind(Math);
const _min = Math.min.bind(Math);
const _pow = Math.pow.bind(Math);
const _floor = Math.floor.bind(Math);
const _round = Math.round.bind(Math);
const _ceil = Math.ceil.bind(Math);
const log = console.log.bind(console);
```

## 位运算的一些技巧

+ 判断一个整数x的奇偶性：x&1=1(奇数)，x&1=0(偶数)

+ 求一个浮点数x的整数部分：~~x，对于正数相当于floor(x), 对于负数相当于ceil(-x)

+ 计算2^n：1<<n相当于pow(2,n)

+ 计算一个数x除以2的n倍：x>>n相当于~~(x/pow(2,n))

+ 判断一个数x是2的整数幂（即x=2^n）:x&(x-1)=0



## 链表

```js
/**
 * 链表节点
 * @param {*} val
 * @param {ListNode} next
 */
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}
/**
 * 将一个数组转为链表
 * @param {array} a
 * @return {ListNode}
 */
const getListFromArray = (a) => {
    let dummy = new ListNode()
    let pre = dummy;
    a.forEach(x => pre = pre.next = new ListNode(x));
    return dummy.next;
}
/**
 * 将一个链表转为数组
 * @param {ListNode} node
 * @return {array}
 */
const getArrayFromList = (node) => {
    let a = [];
    while (node) {
        a.push(node.val);
        node = node.next;
    }
    return a;
}
/**
 * 打印一个链表
 * @param {ListNode} node 
 */
const logList = (node) => {
    let str = 'list: ';
    while (node) {
        str += node.val + '->';
        node = node.next;
    }
    str += 'end';
    log(str);
}

/**
 * getListFromArray() 解释
 * js连续赋值案例解析: https://blog.csdn.net/qq_43068818/article/details/123438720

x = 1 
dummy = {
    val = undefined,
    next = { val = 1,
        next = null;
    }
}
pre = {
    val = 1,
    next = null;
}
// pre与dummy.next指针指向同一个对象

x = 2
dummy = {
    val = undefined,
    next = {
        val = 1,
        next = {
            val = 2,
            next = null;
        }
    }
}
pre = {
    val = 2,
    next = null;
}
// pre与dummy.next指针指向同一个对象

x = ...
 * */ 

```

## 矩阵(二维数组)

```js
/**
 * 初始化一个二维数组
 * @param {number} r 行数
 * @param {number} c 列数
 * @param {*} init 初始值
 */
const initMatrix = (r, c, init = 0) => new Array(r).fill().map(_ => new Array(c).fill(init));
/**
 * 获取一个二维数组的行数和列数
 * @param {any[][]} matrix
 * @return [row, col]
 */
const getMatrixRowAndCol = (matrix) => matrix.length === 0 ? [0, 0] : [matrix.length, matrix[0].length];
/**
 * 遍历一个二维数组
 * @param {any[][]} matrix 
 * @param {Function} func 
 */
const matrixFor = (matrix, func) => {
    matrix.forEach((row, i) => {
        row.forEach((item, j) => {
            func(item, i, j, row, matrix);
        });
    })
}
/**
 * 获取矩阵第index个元素 从0开始
 * @param {any[][]} matrix 
 * @param {number} index 
 */
function getMatrix(matrix, index) {
    let col = matrix[0].length;
    let i = ~~(index / col);
    let j = index - i * col;
    return matrix[i][j];
}
/**
 * 设置矩阵第index个元素 从0开始
 * @param {any[][]} matrix 
 * @param {number} index 
 */
function setMatrix(matrix, index, value) {
    let col = matrix[0].length;
    let i = ~~(index / col);
    let j = index - i * col;
    return matrix[i][j] = value;
}
```


## 二叉树
> 什么是二叉树 https://blog.csdn.net/weixin_59371851/article/details/125646882














