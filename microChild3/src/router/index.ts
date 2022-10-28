//import {createRouter, createWebHistory} from 'vue-router'

const router = [
    {
        path: '/color',
        name: 'color',
        component: () => import('@/views/Hain.vue') ,// 当你点击按钮跳转时对应的组件，
        children:[
        ]
    }
];


// const router = createRouter({
//     routes: [...routeList]
// })

export default router;
