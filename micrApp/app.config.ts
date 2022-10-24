const previewPort = 8821;
const domain = 'http://localhost';
export default {
    projectName: 'spms-standard-business-app',
    appName: 'microApp',
    preview: {
        port: previewPort,
        host: domain + ':' + previewPort
    },
    microApps: {
        // 系统管理
        'childName2': {
            dev: {
                url: 'http://localhost:7100/'
            },
            preview: {
                url: `http://localhost:${8821}/childName2/`
            },
            build: {
                url: '/childName2/'
            }
        }
    }
};
