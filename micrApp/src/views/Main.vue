<template>
  <div>

    <div class="parent">
      我是父亲首页123
    </div>

    <!-- 访问路由组件页面：login和register -->
    <!--    <router-link to="/micro1/child1">登录</router-link>-->
    <!-- 展示匹配到的组件：login和register -->
    <div class="center">
        <micro-app  :date="dataForChild" inline disablesandbox name='childName2'  url='http://localhost:7100/child2/vite/'></micro-app>
    </div>

    <div class="bottom">
      <micro-app  inline disablesandbox name='childName3'  url='http://localhost:7200/child3/vite/' ></micro-app>
    </div>



  </div>
</template>

<script setup>
import {ref, reactive,onMounted} from 'vue'
import {useRouter} from 'vue-router'

let router = useRouter();

let dataForChild = reactive({name:"张三"})

// onMounted(()=>{
//   console.log('父window',window)
//   window['micro-app']
// })

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

.center {
  display: inline-block;
  width: 100%;
  height: 200px;
  background-color: darkolivegreen;
}

.bottom {
  margin-top: 20px;
  display: inline-block;
  width: 100%;
  height: 200px;
  background-color: gray;
}

.parent {
  color: green;
}
</style>
