const fs = require('fs')
const path = './public/version.json'


//验证文件是否存在
/**
 * 验证文件是否存在
 * @param {*} path
 */
function isFileExist(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

var bExistsSync = isFileExist(path);
//1.判断version文件是否存在
if(!bExistsSync){
    throw new Error('version.json 文件不存在,请在public 文件夹下创建version.json文件 ')
}


let data = fs.readFileSync(path, 'utf8');
//2.判断 version存在
console.log("json",data)
if(!(data && JSON.parse(data) && JSON.parse(data)['version'])){
    throw new Error('version.json 需要有version 字段')
}
/**
 * 格式化时间函数
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//3.取出主版本号
let baseVersion =JSON.parse(data)['version'].split('_')[0];


let version = {
    version: baseVersion + "_" + new Date().Format("yyyyMMddhhmm")
}

//4.自动添加版本后缀
let res = fs.writeFileSync(path, JSON.stringify(version), 'utf8');
console.log(version);
