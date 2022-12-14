import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import microApp from '@micro-zoe/micro-app'
import {getDevUrl} from "./microApp/urlCtrl";

console.log('1111111111111111111',process.env.NODE_ENV === 'development')
microApp.start({
    'disable-memory-router': true, // 关闭虚拟路由系统
    'disable-patch-request': true, // 关闭对子应用请求的拦截
    disableScopecss: false, // 默认值false
    plugins: {
        modules: getDevUrl()
        // modules: {
        //     'childName2': [
        //         {
        //             loader(code) {
        //                 if (process.env.NODE_ENV === 'development') {
        //                     // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
        //                     code = code.replace(/(from|import)(\s*['"])(\/childName2\/)/g, all => {
        //                         return all.replace('/childName2/', 'http://localhost:7100/')
        //                     })
        //                 }
        //
        //                 return code
        //             }
        //         }
        //     ],
        //     'childName3': [
        //         {
        //             loader(code) {
        //                 if (process.env.NODE_ENV === 'development') {
        //                     // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
        //                     code = code.replace(/(from|import)(\s*['"])(\/child3\/vite\/)/g, all => {
        //                         return all.replace('/child3/vite/', 'http://localhost:7200/')
        //                     })
        //                 }
        //
        //                 return code
        //             }
        //         }
        //     ],
        //     'vue2': [
        //         {
        //             loader(code) {
        //                 if (process.env.NODE_ENV === 'development') {
        //                     // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
        //                     code = code.replace(/(from|import)(\s*['"])(\/child4\/webpack\/)/g, all => {
        //                         return all.replace('/child4/webpack/', 'http://localhost:7400/')
        //                     })
        //                 }
        //
        //                 return code
        //             }
        //         }
        //     ],
        //     // 解决create-react-app中sockjs-node报错的问题
        //     'appname-react16': [{
        //         loader(code) {
        //             if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
        //                 code = code.replace('window.location.port', '4004')
        //             }
        //             return code
        //         }
        //     }],
        //     // 解决create-react-app中sockjs-node报错的问题
        //     'appname-react17': [{
        //         loader(code) {
        //             if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
        //                 code = code.replace('window.location.port', '4005')
        //             }
        //             return code
        //         }
        //     }],
        // }

        // modules: {
        //     'childName2': [
        //         {
        //             loader(code) {
        //                 if (process.env.NODE_ENV === 'development') {
        //                     // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
        //                     var childName2 = 'childName2'
        //                     let reg = eval(`/(from|import)(\\s*['\"])(\\/${childName2}\\/)/g`)
        //                     code = code.replace(reg, all => {
        //                         return all.replace('/childName2/', 'http://localhost:7100/')
        //                     })
        //                 }
        //
        //                 return code
        //             }
        //         }
        //     ]
        // }
    }
})

const app = createApp(App)

//挂载全局
app.config.globalProperties.microApp = microApp

app.use(router).mount('#app')

