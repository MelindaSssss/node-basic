// 安装 npm i socket.io

var io = require('socket.io')()

io.on('connection', function (client) {
  console, log('connected')

  client.on('message', function (message) {
    console.log('message from client:', message)
  })

  io.emit('message', 'hello client, this is the tip from server')
})

io.listen(8181)

/* 

1、监听连接信息，当收到连接后，向客户端发送一句消息，消息头是“message”，消息体是"this is server"。

消息头用来表识消息内容，在客户端，需要识别这个消息头才能正确获取消息体内容。

2、同时，监听客户端发来的消息头为“message“的消息。
*/
