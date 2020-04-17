// 这是main.js ，是我们项目的JS入口文件。这个文件存在的理由如下：
// 因为 我们不推荐直接在每个页面上面引入任何包和css文件（这样会导致每个页面都有多次二次ajax请求）
// 我们推荐所有的东西都在main.js上面写，以后每个页面只要引入main.js文件就可以了

// 1.导入包 如jquery
// es6中导入模块的格式： import 接收变量名 from 具体包名
// 由于ES6的代码，不经过webpack处理，浏览器解析不了（会报错）
// 下面通过命令用webpack对main.js进行处理：
//命令格式： webpack 要打包的文件的路径 -o 打包好的文件的路径
// webpack ./webpack_learning/src/main.js -o ./webpack_learning/dist/bundle.js
import $ from 'jquery'
// const $ = require('jquery') // 这是node.js中引入包的写法（不经过webpack处理浏览器也解析不了）
$(function () {
    $('li:odd').css('backgroundColor', 'lightblue') // 选择器选中li的奇数行
    $('li:even').css('backgroundColor', function () {
        return '#' + 'D97634'
    }) // 选择器选中li的偶数行
})
//
/* 经过上述的操作说明 webpack 的【作用】：
* 1.webpack能够处理 js文件的互相依赖关系
*   原本来说，一个js文件不能引入别的js文件（如本main.js文件不能直接引用jquery），除非运用requireJs技术，也就是要依赖该技术。
*   结果我们使用了webpack就解决了这个问题，说明了webpack能够处理 js文件的互相依赖关系
* 2.webpack能够处理js的兼容性，把高级的浏览器不支持的语法转为低级的浏览器支持的可识别的语法
* */
