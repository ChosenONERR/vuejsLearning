const fs = require('fs')

function getFileByPath(fPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fPath, 'utf-8', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

// ==========================需求1：轮流读取3个文件（第一个文件读取失败不会影响后续文件的读取）==========================

// 以下写法不推荐，是一种“回调地狱”的写法，而 promise可以解决回调地狱的问题
/*
getFileByPath('./files/1.txt')
    .then(function (data) {
        console.log(data + '---')

        getFileByPath('./files/2.txt')
            .then(function (data) {
                console.log(data + '---')

                getFileByPath('./files/3.txt')
                    .then(function (data) {
                        console.log(data + '---')
                    })
            })
    })*/

// 以下是推荐写法：在上一个 .then中返回一个新的 promise实例，可以继续用下一个 .then来处理
// 如果前面的 promise执行失败，后续的promise将不会执行。如若我们想让后续的promise继续执行，需要为每个promise指定失败回调
getFileByPath('./files/1.txt')
    .then(function (data) {
        console.log(data + '---')
        return getFileByPath('./files/2.txt')
    }, function (err) {
        console.log(err.message)
        // 为了后续能够执行，我们仍需要返回一个 promise对象
        return getFileByPath('./files/22.txt')
    })
    .then(function (data) {
        console.log(data + '---')
        return getFileByPath('./files/3.txt')
    })
    .then(function (data) {
        console.log(data + '---')
    })

// =================需求2：轮流读取3个文件（后一个文件读取的结果依赖前一个文件读取的结果，前一个报错则：1.这个异常必须
// ========================被捕获 2.后续将不再执行）==========================
getFileByPath('./files/11.txt')
    .then(function (data) {
        console.log(data + '---')
        return getFileByPath('./files/2.txt')
    })
    .then(function (data) {
        console.log(data + '---')
        return getFileByPath('./files/3.txt')
    })
    .then(function (data) {
        console.log(data + '---')
    }).catch(function (err) {
        // catch的作用：如果前面有任何的 Promise执行失败，则立即终止所有的promise的执行，并马上进入catch去处理这个异常
    console.log('这是自己处理的方式：' + err.message)
})