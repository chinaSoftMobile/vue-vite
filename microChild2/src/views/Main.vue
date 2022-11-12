<template>
  <div class="child2">
    我是儿子2
  </div>
<!--  <div @click="jump">跳转</div>-->


</template>

<script lang="ts" setup>
import {ref, reactive,onMounted} from 'vue'
import {useRouter} from 'vue-router'

let router = useRouter();
//let data = window.eventCenterForChildName2.getData()
// const data = window.microApp.getData() // 返回基座下发的data数据
//

onMounted(()=>{
  //console.log('来自父数据', window.eventCenterForChildName2.getData())

})

const jump = () => {
  //data.pushState('app-vite2#/color');
  router.replace({path:'/color'})
}

</script>

<style scoped>
.child2 {
  color: red;
}
</style>
