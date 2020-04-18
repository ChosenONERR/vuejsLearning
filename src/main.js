/*
这是main.js ，是我们项目的JS入口文件。这个文件存在的理由如下：
因为 我们不推荐直接在每个页面上面引入任何包(js)和css文件（这样会导致每个页面都有多次二次ajax请求）
我们推荐所有的东西都在main.js上面写，以后每个页面只要引入main.js文件就可以了
*/

// 1.导入包 如jquery
// es6中导入模块的格式： import 接收变量名 from 具体包名
// 由于ES6的代码，不经过webpack处理，浏览器解析不了（会报错）
// 下面通过命令用webpack对main.js进行处理：
//命令格式： webpack 要打包的文件的路径 -o 打包好的文件的路径
// webpack ./webpack_learning/src/main.js -o ./webpack_learning/dist/bundle.js
import $ from 'jquery' // 引入一个js包，我们需要用一个变量接受一下（不同于css// ）
// const $ = require('jquery') // 这是node.js中引入包的写法（不经过webpack处理浏览器也解析不了）

import './css/index.css' // 引入一个css样式表
import './css/index.less' // 引入.less文件
import './css/index.scss' // 引入.scss文件
/*
注意：webpack 默认只能打包处理 js类型的文件，无法处理其他非 js类型的文件
如果非要处理，必须安装一些合适的第三方loader加载器：
1. 如果想要打包 css文件，需要安装两个插件： npm i style-loader css-loader -D
2. 打开 webpack.config.js 这个配置文件新增一个配置节点 module，它是一个对象。 在modiule对象身上有一个rules数组属性，
   存放了所有第三方文件的匹配和处理规则
3. .less文件同理，需要下载插件 npm i less-loader -D （P.S.：在这之前得先 nom i less -D 因为该插件依赖它）

注意： webpack 处理第三方文件类型的过程：
1. webpack发现这个  要处理的的文件不是js文件，然后就去配置文件webpack.config.js中查找有无对应的第三方的loader规则
2. 如果能找到对应的规则，就会调用对应的loader处理这种文件类型
3. 在调用loader的时候，是从后往前调用的（例：如若第三方匹配规则是：{test: /\.css$/, use: ['style-loader', 'css-loader']}，
   则先调用css-loader，调用的结果传给style-loader）
4. 当最后一个loader调用完毕会把最后的处理结果直接交给webpack进行打包合并，最终输出到bundle.js文件中去
*/

$(function () {
    $('li:odd').css('backgroundColor', 'blue') // 选择器选中li的奇数行
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
