<template>
  <div>

    <div @click="change" class="parent">
      我是父亲首页1020+0912
    </div>
    <!-- 访问路由组件页面：login和register -->
    <!--    <router-link to="/micro1/child1">登录</router-link>-->
    <!-- 展示匹配到的组件：login和register -->
    <div class="center">
      <micro-app
          disablesandbox
          :data='microAppData'
          name='childName2'
          url='http://localhost:7100/childName2'
          @mounted='handleMount'
          @datachange='handleDataChange'
      ></micro-app>
    </div>

    <!--    <div class="center">-->
    <!--      <micro-app-->
    <!--          :data='microAppData'-->
    <!--          name='vue2'-->
    <!--          url='http://localhost:7400/child4/webpack/'-->
    <!--          @mounted='handleMount'-->
    <!--          @datachange='handleDataChange'-->
    <!--      ></micro-app>-->

    <!--    </div>-->

    <!--    <div class="bottom">-->
    <!--      <micro-app  inline disablesandbox name='childName3'  url='http://localhost:7200/child3/vite/' ></micro-app>-->
    <!--    </div>-->
  </div>
</template>

<script setup>

import {ref, reactive, onMounted, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import appConfig from '../../app.config'

import {EventCenterForMicroApp} from '@micro-zoe/micro-app'
// 注意：每个vite子应用根据appName单独分配一个通信对象
window['eventCenterForChildName2'] = new EventCenterForMicroApp('childName2')


const getVersion = () => {
  let url = `//${window.location.host}/version.json?t=${new Date().getTime()}`
  axios.get(url).then((res) => {
    if (res.status === 200) {
      let serverVersion = res.data.version
      let localVueVersion = localStorage.getItem('version');
      console.log("服务器版本",serverVersion);
      if(!localVueVersion && serverVersion!=localVueVersion){
       // window.location.reload();
      }
    }
  })
}

let {proxy} = getCurrentInstance();
let router = useRouter();


let microAppData = reactive({
  name: "张三", pushState: (path) => {
    router.push(path)
  }
})

let change = () => {
  proxy.microApp.setData('vue2', {a: 1});

}

onMounted(() => {
  getVersion();
})

let handleDataChange = (e) => {
  console.log('来自子应用的数据：', e.detail.data)
}


let handleMount = () => {
  console.log('child-vite 已经渲染完成')
  setTimeout(() => {

  }, 2000)
}


let jump = () => {
  router.push({path: '/app-vite/#/'})
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
