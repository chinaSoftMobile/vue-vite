<template>
  <micro-app
      name='childName2'
      :url='url'
      inline
      disablesandbox
      :data='microAppData'
      @created='handleCreate'
      @beforemount='handleBeforeMount'
      @mounted='handleMount'
      @unmount='handleUnmount'
      @error='handleError'
      disableScopecss='false'
  ></micro-app>
</template>

<script setup>
import {ref, reactive} from 'vue'
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'
// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppNameVite = new EventCenterForMicroApp('childName2')

let url = ref('http://localhost:7100/childName2/')

let microAppData = reactive({msg: '来自基座的数据'})

let handleCreate = ()=>{
  console.log('child-vite 创建了')
}

let handleBeforeMount = ()=>{
  console.log('child-vite 即将被渲染')
}

let handleMount = ()=>{
  console.log('child-vite 已经渲染完成')

  setTimeout(() => {
    // @ts-ignore
    microAppData = {msg: '来自基座的新数据'}
  }, 2000)
}


let handleUnmount = ()=>{
  console.log('child-vite 卸载了')
}


let handleError = ()=>{
  console.log('child-vite 加载出错了')
}


// let  handleDataChange = (e: CustomEvent):void=>{
//   console.log('来自子应用 child-vite 的数据:', e.detail.data)
// }

</script>

<style scoped>
.ba {
  background-color: #535bf2;
}
</style>
