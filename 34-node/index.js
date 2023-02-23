// 远程监控屏幕
//   目标效果:在网页中实时查看系统屏幕内容
//! 实现原理
//! 1.用express实现服务器 2.当访问来临时 截图并保存成文件 再传给访问者

var express = require('express')
var app = express()

// 中间件 实现屏幕监控
app.use(function (req, res, next) {
  var screenshot = require('desktop-screenshot')

  // 屏幕截图
  screenshot('screenshot.png', function (error, complete) {
    console.info(req.url)

    if (error) {
      console.info('screenshot failed', error)
    } else {
      console.info('screenshot succeeded')
    }
  })

  // 继续原本应该要走的流程
  next()
})

// 内置中间件 静态文件访问

app.use(express.static('./'))

// 监听

var server = app.listen(8181, function () {
  var host = server.address().address
  var port = server.address().port

  console.info(host, port)
})

// 当访问根目录时触发
app.get('./', function (req, res) {
  res.send('hello here is screenshot')
})

//!  运行   http://127.0.0.1:8181/screenshot.png  可以看到监控画面
