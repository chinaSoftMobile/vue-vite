import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    define: {
        'process.env': {
            BASE_URL:''
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            // '/spms-wisdom': {
            //   // target: 'http://119.3.172.143:28200/api',
            //   // target: 'http://10.88.40.119:9001/', // 科洪电脑
            //   // target: 'http://10.88.40.204:9001/', // 海洋电脑
            //   target: 'https://app.sharkyun.com/', // 测试环境
            //   changeOrigin: true,
            //   // rewrite: (path) => path.replace(/^\/spms-wisdom/, ''),
            // },
            /*************------下面是业务模块各个子模块-----**************/
            // gis
            '/gis': {
                target: 'https://121.37.71.63:8306', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-user/, ''),
            },
            '/services': {
                target: 'https://121.37.71.63:8306', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-user/, ''),
            },
            // 用户模块
            '/spms-standard-service-user': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-user/, ''),
            },
            // 组织模块
            '/spms-standard-service-group': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-group/, ''),
            },
            // 字典模块
            '/spms-standard-service-system': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-system/, ''),
            },
            // 权限模块
            // -----------目前为俩服务，support和service，后面会将support服务迁移到service-----------
            '/spms-standard-support-iam': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-support-iam/, ''),
            },
            '/spms-standard-service-iam': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-support-iam/, ''),
            },
            // 消息模块
            '/spms-standard-support-message': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-support-message/, ''),
            },
            // 工作流
            '/spms-standard-service-workflow': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.28.22.240:8090', // 黄云龙环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-service-workflow/, ''),
            },
            // 文件存储模块
            '/spms-standard-support-preview': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/spms-standard-support-preview/, ''),
            },
            // 空间模块
            '/spms-wisdom-service-space': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/spms-wisdom-service-space/, ''),
            },
            // 设备模块
            '/spms-wisdom-service-device': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.88.40.188:8080', // 永奎
                //target: 'http://10.28.22.238:7100', // 刘科洪
                //target: 'http://10.88.40.204:9001', // 泛海洋
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/spms-wisdom-service-device/, ''),
            },
            // 护工模块
            '/spms-wisdom-service-nursing': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                //  target: 'http://10.88.40.8:8080', // 邹睿
                changeOrigin: true,
                //  rewrite: (path) => path.replace(/^\/spms-wisdom-service-nursing/, ''),
            },
            '/spms-wisdom-service-security': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.10.40.213:31323', //解飞本机
                // target: 'http://192.168.231.173:8080', //张小河本机
                changeOrigin: true,
                // rewrite: (path) =>
                // path.replace(/^\/spms-wisdom-service-security/, ''),
            },
            '/spms-wisdom-service-iotmonitor': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.110.60.147:8080', // 闫晓博本机
                changeOrigin: true,
                // rewrite: (path) =>
                //   path.replace(/^\/spms-wisdom-service-iotmonitor/, ''),
            },
            '/spms-standard-service-tenant': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.110.60.147:8080', // 闫晓博本机
                changeOrigin: true,
                // rewrite: (path) =>
                //   path.replace(/^\/spms-wisdom-service-iotmonitor/, ''),
            },
            '/spms-wisdom-service-commanddispatch': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.110.60.147:8080', // 闫晓博本机
                // target: 'http://10.88.40.188:8080', // 永奎
                changeOrigin: true,
                // rewrite: (path) =>path.replace(/^\/spms-wisdom-service-commanddispatch/, ''),
            },
            '/spms-standard-support-pay': {
                target: 'https://kf1-2.cighospital.com:8080', // 测试环境
                // target: 'http://10.110.60.147:8080', // 闫晓博本机
                // target: 'https://kf1-2.cighospital.com:8080', // 永奎
                changeOrigin: true,
                //rewrite: (path) =>path.replace(/^\/spms-standard-support-pay/, ''),
            }
        },
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: "import { h } from 'vue'",
    }
})
