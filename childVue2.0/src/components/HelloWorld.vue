<template>
  <div class="hello">
    我是vue 2.0 webpack
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('父数据变动', data)
    })
  },
  mounted() {
    //console.log('kkkk', window.microApp.getData())
    this.getVersion();
    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({myname: 'vue2'})
    }, 3000)


  },
  methods: {
    dataListener(data) {
      // console.log('来自基座应用的数据', data)
    },
    getVersion() {
      let url = `//${window.location.host}/static/version.json?t=${new Date().getTime()}`
      axios.get(url).then((res) => {
        if (res.status === 200) {
          let serverVersion = res.data.version
          let localVueVersion = localStorage.getItem('version');
          console.log("服务器版本", serverVersion);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
