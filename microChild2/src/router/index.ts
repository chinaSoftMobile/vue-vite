//import {createRouter, createWebHistory} from 'vue-router'

const router = [
    {
        path: '/',
        name: '',
        component: () => import('@/views/Main.vue') ,// 当你点击按钮跳转时对应的组件，
        children:[
        ]
    },
    {
        path: '/color',
        name: 'Color',
        component: () => import('@/views/Color.vue') ,// 当你点击按钮跳转时对应的组件，
        children:[
        ]
    }
];


// const router = createRouter({
//     routes: [...routeList]
// })

export default router;
