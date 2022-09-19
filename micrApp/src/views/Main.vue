<template>
  <div>

    <div class="child2">
      我是父亲首页123
    </div>

    <!-- 访问路由组件页面：login和register -->
    <!--    <router-link to="/micro1/child1">登录</router-link>-->
    <!-- 展示匹配到的组件：login和register -->
    <div class="right">
        <micro-app  inline disablesandbox name='appname-vite'  url='http://localhost:8081/child/vite/'></micro-app>
    </div>


  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'

let router = useRouter();

let jump = ()=>{
  router.push({path:'/app-vite/#/'})
}

</script>

<style scoped>
.micro_wrapper {
  background-color: darkolivegreen;
}

.left {
  display: inline-block;
  width: 100%;
  height: 100px;
  background-color: beige;
}

.right {
  display: inline-block;
  width: 100%;
  height: 200px;
  background-color: darkolivegreen;
}

.bottom {
  background-color: gray;
}

.child2 {
  color: green;
}
</style>
