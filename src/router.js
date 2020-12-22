/* 抽离路由模块 */
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
//  手动安装 VueRouter
Vue.use(VueRouter)

// 定义组件模板文件有2种方式：
// 方式1：本地定义组件模板
/*var com = {
    template:'<h1>我是app组件</h1>'
}*/
// 方式2：外部引入 .vue组件
import login from './main/Login.vue'
import register from './main/Register.vue'
import account from './main/Account.vue'
import goodsList from './main/GoodsList.vue'

// 第3步 创建路由对象
var router = new VueRouter({
    routes:[
        // routes数组下有命名路由对象
        {
            path:'/account',
            component:account,
            children:[
                // 记住path不能写 
                { path:'login', component: login},
                { path:'register', component: register}
            ]
        },
        { path:'/goodsList', component: goodsList}
    ]
})


// 由于路由已经是一个独立的模块了，需要把它暴露出来给别人调用
export default router
