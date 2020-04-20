/*
 1. Promise是一个构造函数，我们可以通过 new Promise()获得一个Promise实例
 2. Promise构造函数上，有两个函数，分别是 resolve()成功回调函数 和 reject()失败回调函数
 3. Promise构造函数上的 prototype属性上有一个 .then()方法，也就是所有 Promise实例都可以访问到 .then()方法
 4. 每当我们 new 一个Promise实例，这个实例就是一个具体的异步操作。这个异步操作有两种状态：
    4.1 状态1：异步执行成功。这时候我们将调用成功回调函数 resolve()
    4.2 状态2：异步执行失败，这时候我们将调用失败回调函数 reject()
    （之所以在不同状态下要调用异步函数，是因为 promise实例是一个异步操作，内部拿到操作结果后无法使用return把操作结果
    返回给调用者。这时候只能使用回调函数把操作结果返回给调用者了）
 5. 如何设定成功和失败回调函数的具体内容？可以在 new Promise实例的时候调用 .then()方法预先为其指定
*/

// 这里 new出来的Promise实例是一个“形式上的异步操作”：没有定义具体的操作的异步操作
// var promise1 = new Promise()

// 这里 new出来的Promise实例是一个“具体上的异步操作”：定义了具体的操作的异步操作
/*
var promise2 = new Promise(function () {
    // function内部写入具体的操作
})*/

const fs = require('fs')

// 执行命令: node Promise基本概念.js 时发现会执行 new出来的 Promise()实例中的异步代码（也就是new的时候同时调用我们写的异步代码）
/*
var promise = new Promise(function () {
    fs.readFile('./files/2.txt', 'utf-8', (err, dataStr) => {
        if(err) throw err
        console.log(dataStr)
    })
})
*/

// 我们希望异步操作代码能够在我们调用的时候才执行，而不是在new Promise()的时候立刻执行。
// 我们知道，在代码中，只有函数function才能按需执行，所以我们可以把Promise的new操作放到一个函数内部，这样就解决问题啦！

function getFileByPath(fPath) {
    // 把Promise的new操作放到一个函数内部
    var promise = new Promise(function (resolve, reject) {
        //这是一个异步方法，主程序不会去执行，直接来到代码最后一行： return promise
        fs.readFile(fPath, 'utf-8', (err, dataStr) => {
            /*if(err) throw err
            console.log(dataStr)*/
            //我们希望返回函数执行的结果给调用者：
            // 采用 return 不可，因为这是一个异步操作
            //return
            //采用回调函数：
            if (err) return reject(err) // 因为“结果失败”，所以下面的代码没必要执行，所以这里用return
            resolve(dataStr)
        })
    })
    return promise; // 此处之所以return promise实例对象，是因为我们希望两个回调函数的具体内容应由调用者去指定
}

// 调用 getFileByPath(fPath)方法 并获取到 promise实例对象
var p = getFileByPath('./files/2.txt'); //当我们拿到p的时候，还没有执行异步操作（promise里面的function）

// 在 promise实例对象中通过 .then()方法 【预先】指定两种回调方法的具体实现（ .then()方法内的两个方法参数，前一个是成功回调函数，后一个是失败回调函数）
p.then(function (data) { // 第1个方法参数是成功回调函数
    console.log(data + '---')
}, function (err) { // 第2个方法参数是失败回调函数
    console.log(err.message + '+++')
})
