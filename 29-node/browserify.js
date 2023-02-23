var browserify = require('browserify')

var b = browserify()
b.add('./index.js')
b.bundle().pipe(process.stdout)

// 也可以直接 将 browserify 通过全局安装，使用命令打包则会更方便些： npm i -g  browserify
