// 编写自己的中间件
// 本例的主要内容即为express编写一个中间件
// 在express中 中间件的概念就是：假如接收到请求 中间件会对请求接手  进行任意处理
// 然后再让请求继续下去 相当于传统编程中的api  hooks概念

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello here is express middleware')
})

// 自己的中间件
app.use(function (req, res, next) {
  console.info('%s %s', req.method, req.url)
  next()
})

var server = app.listen(8181, function () {
  var host = server.address().address
  var port = server.address().port

  console.info(host, port)
})

/* 
中间件有两个重点：

1、调用app.use（）来应用一个中间件；

2、调用next（）继续执行下一个中间件（可能不存在更多的中间件，只是让执行继续下去）。
*/
