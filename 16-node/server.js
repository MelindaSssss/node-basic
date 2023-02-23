/*
 * Nodejs的http模块，是基于net.server，经过c++二次封装，也是nodejs的核心模块。
 * 功能比net.server更强，可解析和操作更多细节内容，如值、content-length、请求方法、响应码状态等等，且使用更方便。
 * 本文将介绍如何用http模块创建一个Web服务器，并再创建一个客户端对其发起访问。
 */
var http = require('http')

// 参数 req是请求数据包 res是返回数据包

var server = http.createServer(function (req, res) {
  // 200 是返回状态码   内容类型是 文本类型

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello 毋米粥火锅 MelindaSssss'.toString())
  res.end()
})

server.listen(8000, function () {
  console.log('server is running on Port 8000')
})

/* 
代码解析：

1、引用http模块，并使用createServer方法建立http服务器；

2、监听在8000端口。
*/
