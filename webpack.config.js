// webpack.config.js 是webpack的配置文件，这个文件应该放在项目的根目录下
// 由于 webpack 是基于Node进行构建的，所以webpack配置文件中任何合法的的Node代码都是支持的
const path = require('path')

// 启用热更新的第 2 步：导入局部安装的webpack
const webpack = require('webpack')

// 导入 可以在内存中生成 html页面的插件：html-webpack-plugin （通过 npm i html-webpack-plugin -D 安装
// 这个插件的作用：
// 1. 自动在内存中根据指定的物理磁盘上的页面生成一个一摸一样的在内存的页面
// 2. 自动把打包好的、在内存中的bundle.js 追加到内存中去
const htmlWebpackPlugin = require('html-webpack-plugin') // ps：只要是插件都要放到 plugins 数组里面去


// 该配置文件是一个 .js文件，可以通过 Node 中的模块操作向外暴露一个 “配置对象”

//============================================== 这一个是 webpack2.xxx版本的方式 =====================================
/*module.exports = {
    // 指定 打包的入口
    entry: path.join(__dirname, './src/index.js'), // 指定 将要被打包的文件
    // 指定 打包的出口
    output:{
        path: path.join(__dirname, './dist'), // 指定 打包好的文件 将要被输出的目录位置
        filename: 'bundle.js' // 指定 输出文件的名称
    }
}*/

//============================================== 这一个是 webpack4.xxx版本的方式 =====================================
module.exports = {
    // 指定 打包的入口
    entry: './src/main.js', // 指定 将要被打包的文件    ./src/main.js
    // 指定 打包的出口
    output: {
        path: path.resolve(__dirname, './dist'), // 指定 打包好的文件 将要被输出的目录位置    ./dist
        filename: 'bundle.js' // 指定 输出文件的名称
    },
    devServer: { // 这是配置 dev-server 命令参数的第二种方式（第一种方式在package.json文件中配置），这种方式麻烦一点
        open: true, // 打包完成后自动打开浏览器
        port: 9090, // 设置启动时候的运行端口
        contentBase: 'src', // 指定托管的根目录
        hot: true // 启用热更新的 第 1 步
    },
    plugins: [ // 该节点用于配置插件
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的 模块对象，这是启用热更新的第 3 步
        new htmlWebpackPlugin({ // 创建一个 可以在内存中生成 html页面 的插件
            template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来就将这个页面在内存中生成一份
            filename: "index.html" //指定内存中生成的页面的名称
        })
    ],
    module: { // 该节点用于配置所有 第三方模块加载器
        rules: [ //所有第三方模块的 匹配规则
            // 采用正则表达式匹配main.js文件中引入的文件：
            // 1.配置处理 .css文件中的第三方loader规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 2.配置处理 .less文件的第三方 loader规则
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 3.配置处理 .scss文件的第三方loader规则
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            // 4.配置处理 图片路径文件的第三饭loader规则（P.S.：不需要配置file-loader，因为这是内部被依赖的）
            //   我们可以给loader传递命令参数，传参的格式和url传值的格式一致，如 http://XXX?id=10&name=zhangsan
            //   我们发现，使用这个之后，页面图片被默认转成了base64编码，但我们希望大图片不要转成这种编码
            //  （1）limit 给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为base64；
            //  （2）使用 limit之后，发现图片是正常的形式，不再是base64编码了，但是名字却是一个32为的hash值。之所以这样，
            //       是因为它为了让名字不重名（重名会导致后一张图片替换掉前一张图片的现象）。这时候我们希望 图片的名字
            //       具有可读性，又不会重名。可以传递name参数，name参数的组成中包括 8位hash值 + 图片原来的名字+后缀名
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=251616&name=[hash:8]-[name].[ext]'},
        ]
    }
}

/* 小结：
* 当我们使用命令'webpack'或'webpack-dev-server'的时候，webpack发现我们并没有用规定的命令格式给它指定入口和出口，
* 故webpack将执行下列步骤：
* 1. webpack 先去项目的根目录下查找有没有 webpack.config.js 配置文件
* 2. 当找到配置文件之后， webpack就会去解析它，结胸完成之后就会得到一个配置对象，并通过node到处该配置对象
* 3. 当 webpack 拿到配置对象之后，就知道了打包的入口和出口
* 4. 执行打包
* */

// 发现了一个问题：每次修改了 main.js 的内容都要自己手动执行 webpack 来打包，麻烦
// 解决：使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
// 1. 运行npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
// 2. 安装完毕后，这个工具的用法和webpack命令的用法完全一样（webpack命令相当于webpack-dev-server）
// 3. 由于我们是在项目中本地安装 webpack-dev-server，所以我们无法把它当作脚本命令在命令窗口直接运行（全局的工具才能直接运行），所以我们要在package.json文件中配置命令
// 4. 由于 webpack-dev-server 这个工具要求只有本地安装了webpack才可以正常运行（全局不行），所以还得本地安装一遍webpack：npm i webpack -D
// 5. webpack-dev-server 帮我们打包生成的bundle.js 文件并没有存放到实际的物理磁盘上，而是直接托管到了电脑的内存中。故我们在项目中引入bundle.js应是在根目录中引入：/bundle.js（根目录中找不到 bundle.js）
// 5. 上述弄完，运行命令： npm run dev 即可