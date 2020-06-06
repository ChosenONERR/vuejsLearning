/*
这是main.js ，是我们项目的JS入口文件。这个文件存在的理由如下：
因为 我们不推荐直接在每个页面上面引入任何包(js)和css文件（这样会导致每个页面都有多次二次ajax请求）
我们推荐所有的东西都在main.js上面写，以后每个页面只要引入main.js文件就可以了
*/

// 1.导入包 如jquery
// es6中导入模块的格式： import 接收变量名 from 具体包名
// 由于ES6的代码，不经过webpack处理，浏览器解析不了（会报错）
// 所以用webpack对main.js进行处理：
//命令格式： webpack 要打包的文件的路径 -o 打包好的文件的路径
// webpack ./webpack_learning/src/main.js -o ./webpack_learning/dist/bundle.js
import $ from 'jquery' // 引入一个js包，我们需要用一个变量接收一下（不同于css// ）
// const $ = require('jquery') // 这是node.js中引入包的写法（不经过webpack处理浏览器也解析不了）
$(function () {
    $('li:odd').css('backgroundColor', 'lightblue') // 选择器选中li的奇数行
    $('li:even').css('backgroundColor', function () {
        return '#' + 'D97634'
    }) // 选择器选中li的偶数行
})

import './css/index.css' // 引入一个css样式表
import './css/index.less' // 引入.less文件
import './css/index.scss' // 引入.scss文件
// 注意，如果通过路径形式，去引入 node_modules中相关的文件，可以及直接省略路径前面的 node_modules这一层目录，直接写包名称
//      （因为如果不写node_modules目录，会直接到node_modules这里查找）
import 'bootstrap/dist/css/bootstrap.css' // 引入bootstrap
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


//
/* 经过上述的操作说明 webpack 的【作用】：
* 1.webpack能够处理 js文件的互相依赖关系
*   原本来说，一个js文件不能引入别的js文件（如本main.js文件不能直接引用jquery），除非运用requireJs技术，也就是要依赖该技术。
*   结果我们使用了webpack就解决了这个问题，说明了webpack能够处理 js文件的互相依赖关系
* 2.webpack能够处理js的兼容性，把高级的浏览器不支持的语法转为低级的浏览器支持的可识别的语法
* */


/*
// 传统js中的创建最对象
function Animal(name) {
    this.name = name
}
Animal.info = 123
var a1 = new Animal('小花')
console.log(Animal.info) // 静态属性
console.log(a1.name) // 实例属性
*/


// class 关键字，是es6中提供的新语法，是用来实现es6中面向对象编程的方式
/*
1. 在 webpack中，默认只能处理一部分 es6新语法，一些更高级的es6新语法webpack没办法处理 。这时候需要借助于第三方的loader来
   帮助处理这些更高级的语法（第三方的loader负责把这些高级语法转换为低级语法从而让webpack识别并打包）。这个loader是Babel：
2.在webpack中，配置Babel：
  2.1 需要运行如下两套命令安装Babel相关的loader功能
    第1套： npm i babel-core babel-loader@7 babel-plugin-transform-runtime -D
    第2套： npm i babel-preset-env babel-preset-stage-0 -D
  2.2 然后在 webpack.config.js配置文件module节点rules数组中添加一个新规则：
  { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }
   注意：一定要排除node_modules，否则Babel会把该文件夹下的第三方的js文件都打包编译，会导致：1.打包会非常慢；2.项目没办法运行
  2.3 在项目的根目录中，新建一个叫做 .babelrc 的Babel配置文件，这个配置文件术语json格式，里面的内容得是json格式规范，如
      不能写注释，字符串必须双引号
      在 .babelrc配置文件中写下如下配置：preset是预设语法，plugins是插件
      {
        "presets": ["env", "stage"],
        "plugins": ["transform-runtime"]
      }
下例中，webpack没办法识别static...
*/
class Person {
    // static关键字修饰属性，用于定义静态属性
    // 静态属性，可以直接被类名调用
    // 实例属性，只能被类的实例访问
    static info = {name: 'kingJames', age: 20}
}

// 访问 Person类 身上的info静态属性
console.log(Person.info)
// 创建 Person类对象（此时和java等后端面向对象语言的用法完全一致了）
var p1 = new Person()


// ==================================== 在webpack中尝试使用Vue ============================================

// ======================== 导入 vue
/* 先总结一下在 webpack中使用 vue
* 1.安装 vue包：npm i vue -S
* 2.由于在webpack中，推荐使用 .vue这个组件模板文件定义组件，所以需要安装能解析这种文件的loader：npm i vue-loader vue-template-compiler -D
* 3.在 main.js中，导入vue模块：import Vue from 'vue'
* 4.定义一个.vue结尾的组件，其中组件有三部分组成：template、script、style（可以安装idea的一个vue插件）,vue-loader把我们
*   把这三者和合在一起形成一个组件对象
* 5.在main.js中使用import导入这个vue组件
* 6.创建vue实例，使用render
* 7.在页面中创建一个id为app的div元素，作为我们的vm控制区域
* */

/*
注意：在webpack中，使用 import Vue from 'vue' 导入的Vue构造函数，功能不完，只提供了 runtime-only的方式 ，并没有提供像
传统网页script标签那样的使用方式

回顾 import包时包的查找流程：
1. 先在项目的根目录下查找有无 node_modules文件夹
2. 找到这个 node_modules文件夹之后，根据包名（此处是vue）找对应的文件夹
3. 找到对应的文件之后，找一个叫做 package.json的包配置文件
4. 在package.json而文件中，查找一个main属性（该main属性指定了该包被加载时的入口文件）
   根据这个流程，我们发现 main属性指定的入口文件是 vue.common.js，而不是我们想要的 vue.js，这也是使用 import Vue from 'vue'
   会报错的原因
*/
// 直接不做任何处理的这种方式导入的vue包是阉割版的，不完整
import Vue from 'vue'
// 采用完整路径找到 vue.js的方式导包
// import Vue from '../node_modules/vue/dist/vue.js'
// 当然我们也可以仍旧用import Vue from 'vue'，但需要做特殊处理：通过在 webpack.config.js配置文件中的 resolve节点修改包路径

/*
默认 webpack无法打包 .vue文件，需要：
1. 安装相关的loader：npm i vue-loader vue-template-compiler -D
2. 在 webpack.config.js配置文件中：
   （1）新增loader配置项：{ test:/\.vue$/, use: 'vue-loader' }
   （2）const VueLoaderPlugin = require('vue-loader/lib/plugin')
   （3）在 plugins节点中 new VueLoaderPlugin()
*/

//===============================导入 vue-router
// 第1步 导入 vue-router
import VueRouter from 'vue-router'
// 第2步 手动安装 VueRouter
Vue.use(VueRouter)

//当我们把路由抽离成单独的一个模块之后，就多了这一步
import router from './router.js'

// 第3步 引入 组件对象
import app from '../App.vue'

/*
注意：App这个组件，是通过Vue实例的render函数渲染出来的，是覆盖了el指定的元素容器中的；而Account和GoodsList组件是通过
      路由匹配监听到的，所以这两个组件只能展示到属于路由的<router-view></router-view>
*/

// 定义 vue实例vm
var vm = new Vue({
    el: '#app',
    data: {
        msg: '我是Vue.js'
    },
    components: {
        // app
    },
    // 在webpack中，如果想要通过vue把一个组件放到页面中去展示，Vue实例中的render函数可实现（components没办法实现）
    render:function (createElements) {
        //render会把组件app【覆盖】 el指定容器，所以不要把路由的router-view 和 router-link标签写到el指定的容器中
        return createElements(app)
    },
    /*
    render可以简写：
    render: c => c(app)
    */
    router // 第4步 将路由对象挂载到Vue实例中
})



// =========================================================================
// 测试export default
import m1, {title as title123,content} from './testExport'
console.log('测试export default接收：'+m1 + '---' + title123 + '---' + content)
