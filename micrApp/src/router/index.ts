import {createRouter, createWebHistory} from 'vue-router'

const routeList = [
    {
        path: '/main',
        name: '',
        component: () => import('@/views/Main.vue') ,// 当你点击按钮跳转时对应的组件，
        children:[
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: '',
        component: () => import('@/views/404.vue') // 当你点击按钮跳转时对应的组件
    },

    {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: '/app-vite:page*',
        name: 'vite',
        component: () => import('@/views/child1.vue') // 当你点击按钮跳转时对应的组件
    },
    {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: '/app-vite1:page*',
        name: 'vite',
        component: () => import('@/views/child1.vue') // 当你点击按钮跳转时对应的组件
    }
];


const router = createRouter({
    history: createWebHistory(),    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    routes: [...routeList]
})

export default router;
