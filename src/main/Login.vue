<template>
    <div>
        <h1>这是login组件</h1>
    </div>
</template>

<script>
    export default {
        name: "Account"
    }
</script>

<style scoped>
    /* style标签的scoped属性是让当前样式只作用在当前 .vue组件（包括其子组件） */
    /* scope原理：样式的scoped 是通过css的属性选择器实现的（只要为组件的style标签设置完scope属性之后，当前组件
    template标签的根容器将会被设置一个自定义属性，然后css样式就会通过选择器对具有该属性的元素进行渲染） */
    div {
        color: red;
    }
</style>