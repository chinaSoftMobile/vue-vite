import { createApp, App as AppInstance } from 'vue'
import { createRouter, createWebHashHistory, RouterHistory, Router } from 'vue-router'
import App from './App.vue'
import routes from './router'

declare global {
    interface Window {
        eventCenterForChildName3: any
        __MICRO_APP_NAME__: string
        __MICRO_APP_ENVIRONMENT__: string
        __MICRO_APP_BASE_APPLICATION__: string
    }
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4 (router: Router) {
    // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
    if (window.location.href.includes('/main-vue3') || window.location.href.includes('/main-vite')) {
        /**
         * 重要说明：
         * 1、这里主应用下发的基础路由为：`/main-xxx/app-vite`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vite`，不同项目根据实际情况调整
         *
         * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/app-vite#
         */
        const realBaseRoute = '/app-vite#'

        router.beforeEach(() => {
            if (typeof window.history.state?.current === 'string') {
                window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
            }
        })

        router.afterEach(() => {
            if (typeof window.history.state === 'object') {
                window.history.state.current = realBaseRoute +  (window.history.state.current || '')
            }
        })
    }
}


// 与基座进行数据交互
function handleMicroData (router: Router) {
    // eventCenterForForChildName3 是基座添加到window的数据通信对象
    if (window.eventCenterForChildName3) {
        // 主动获取基座下发的数据
        console.log('child-vite getData:', window.eventCenterForChildName3.getData())

        // 监听基座下发的数据变化
        window.eventCenterForChildName3.addDataListener((data: Record<string, unknown>) => {
            console.log('child-vite addDataListener:', data)

            if (data.path && typeof data.path === 'string') {
                data.path = data.path.replace(/^#/, '')
                // 当基座下发path时进行跳转
                if (data.path && data.path !== router.currentRoute.value.path) {
                    router.push(data.path as string)
                }
            }
        })

        // 向基座发送数据
        setTimeout(() => {
            window.eventCenterForChildName3.dispatch({ myname: 'vite-app3' })
        }, 3000)
    }
}

let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null
// 将渲染操作放入 mount 函数
function mount () {
    history = createWebHashHistory()
    router = createRouter({
        history,
        routes,
    })
    app = createApp(App)
    app.use(router)
    app.mount('#vite-app3')
    console.log('微应用child3渲染了')
    handleMicroData(router)
    fixBugForVueRouter4(router)
}

// 将卸载操作放入 unmount 函数
function unmount () {
    app?.unmount()
    history?.destroy()
    // 卸载所有数据监听函数
    window.eventCenterForChildName3?.clearDataListener()
    app = null
    router = null
    history = null
    console.log('微应用child3卸载了')
}


// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
    // @ts-ignore
    window['micro-app-childName3'] = { mount, unmount }


} else {
    // 非微前端环境直接渲染
    mount()
}










