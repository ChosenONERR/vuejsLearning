// webpack.config.js 是webpack的配置文件，这个文件应该放在项目的根目录下

const path = require('path')


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
    output:{
        path: path.resolve(__dirname, './dist'), // 指定 打包好的文件 将要被输出的目录位置    ./dist
        filename: 'bundle.js' // 指定 输出文件的名称
    }
}

/* 小结：
* 当我们使用命令'webpack'的时候，webpack发现我们并没有用规定的命令给它指定入口和出口，故webpack将执行下列步骤：
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