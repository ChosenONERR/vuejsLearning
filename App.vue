<template>
    <div>
        <h1>我是App组件</h1>
        <router-link to="/account">Account组件</router-link>
        <router-link to="/goodsList">goodsList组件</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: '123'
            }
        },
        methods:{
            show(){
                console.log('调用了 App.vue 中的show方法')
            }
        }
    }
</script>

<style scoped>

</style>