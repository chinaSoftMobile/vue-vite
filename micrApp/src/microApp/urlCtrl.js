import appConfig from '../../app.config'

/**
 * microApp 获取 开发环境配置信息
 */
const getDevUrl = () => {
    let keys = Object.keys(appConfig.microApps);
    let modules = {};
    keys.forEach((item) => {
        modules[item] = [{
            loader(code) {
                if (process.env.NODE_ENV === 'development') {
                    // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
                    //\s 匹配空格 ,* 0次或多次 ,\/ 转义/
                    let reg = eval(`/(from|import)(\\s*['\"])(\\/${item}\\/)/g`)
                    code = code.replace(reg, all => {
                        return all.replace(`/${item}/`, appConfig.microApps[item].dev.url)
                    })
                }
                return code
            }

        }];
    })
    return modules;
}

export {
    getDevUrl
}
