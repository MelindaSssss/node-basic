var dgram = require('dgram')
var fs = require('fs')

client()

function client() {
  //通过流读取文件内容
  var inStream = fs.createReadStream('./file.txt')

  inStream.on('readable', function () {
    send()
  })

  function send() {
    var message = inStream.read(16)
    var socket = dgram.createSocket('udp4')

    console.info('message', message)
    //没有内容了？关闭连接
    if (!message) {
      return socket.unref()
    }

    //连接本地8000端口
    socket.send(message, 0, message.length, 8000, '127.0.0.1', function (
      err,
      bytes,
    ) {
      send()
    })
  }
}
