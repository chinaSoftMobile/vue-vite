import {UserConfigExport, ConfigEnv,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join, resolve} from 'path'
import {writeFileSync} from "fs";
import federation from '@originjs/vite-plugin-federation'

export default ({command,mode}: ConfigEnv): UserConfigExport => {
  return {
    //`${process.env.NODEdev_ENV === 'production' ? 'http://localhost:7101' : ''}/childName2/`,
    base:loadEnv(mode, process.cwd()).VITE_BASE_PUBLICPATH,
    plugins: [
      vue(),
      federation({
        name:'childName2',// 远程模块名称
        filename:'remoteEntry.js',// 远程模块入口文件，与本地模块中`remotes`配置相对应,导出入口文件
        remotes: {
          // 导入远程的模块
        },
        exposes: {
          // 导出模块
          './color':'./src/views/Color.vue',
          './appApi': './src/customize/appApi.ts'
        }
      }),
      (function () {
        let basePath = ''
        return {
          name: "vite:micro-app",
          apply: 'build',
          configResolved(config) {
            basePath = `${config.base}${config.build.assetsDir}/`
          },
          writeBundle (options, bundle) {
            for (const chunkName in bundle) {
              if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
                const chunk = bundle[chunkName]
                if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                  chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                    return all.replace($3, new URL($3, basePath))
                  })
                  const fullPath = join(options.dir, chunk.fileName)
                  writeFileSync(fullPath, chunk.code)
                }
              }
            }
          },
        }
      })() as any,
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    preview: {
      port: 7101
    },
    server: {
      host: '0.0.0.0',
      port: 7100,
      headers: {
        'Access-Control-Allow-Origin': '*' // 设置跨域
      },
      proxy: {
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: "import { h } from 'vue'",
    },
    build: {
      outDir: 'dist',
    }
  }
}
