//! 通过udp传输文件
// ! 创建一个简单的UDP服务器   展示传输文件示例

var dgram = require('dgram')

// 本文将要写一个udp服务器，和一个udp客户端，并实现客户端发送文件给服务器。

server()

function server() {
  //! udp4 和 udp6 的区别
  var socket = dgram.createSocket('udp4')

  socket.on('message', function (msg, rinfo) {
    process.stdout.write(msg.toString())
  })

  socket.on('listening', function () {
    console.log('server ready:', socket.address())
  })

  // 绑定端口
  socket.bind(8000)
}

/* 

代码解读：

1、dgram是nodejs的内置模块，提供了 UDP 数据包 socket 的实现。

2、server（）函数提供了监听和消息响应方法，当接收到数据时，会进行输出显示。
*/
