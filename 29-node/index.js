// 在浏览器端使用Node模块
// 正常理解来说  Nodejs是应用于服务端 后端的
//  但是nodejs编写的代码 也是能运行于客户端 前端的 包括require方法组织的代码
//  要实现这一点 需要借助于三方模块  Browserify (http://browserify.org/)

// 它是一个将nodejs代码 进行打包 以使之能在浏览器环境使用
// 简单示例

var abc = require('./abc.js')

document.getElementById('result').innerHTML = abc(100, 200)
