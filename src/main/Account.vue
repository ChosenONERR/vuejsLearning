<template>
    <div>
        <h1>这是Account组件</h1>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Account"
    }
</script>

<style scoped lang="scss">
    /* 普通的 style标签只支持普通的样式，如果要启用 scss或 less，需要为style元素设置 lang属性 */
    /* style标签的scoped属性是让当前样式只作用在当前 .vue组件（包括其子组件） */
    body{
        div {
            font-style: italic;
        };
    }

</style>