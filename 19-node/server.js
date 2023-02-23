//! 利用nodejs实现加密的tcp https服务器

/*
 *
 * 本文将使用nodejs的TLS模块，用net.createServer 方法，创建一个加密通讯的TCP服务器(https服务器)
 * SSL证书
 * 进行SSL通信，SSL公钥、私钥证书是必备的。
 * 当前，免费ssl证书的获取方法已经很多，不过一般只能获取独立网站的证书。泛域名、多域名证书一般还是付费的。
 * 如下例，网站从synmatec获取了免费证书。从域名的证书管理中下载它。
 * 可以直接去买阿里云的免费ssl证书  数量是20个 有效期是一年
 */
var tls = require('tls')
var fs = require('fs')

var options = {
  key: fs.readFileSync('./jshaman.com.key'),
  cert: fs.readFileSync('./jshaman.com.pem'),
}

var server = tls.createServer(options, function (cleartextStream) {
  console.log('connected')
  cleartextStream.write('welcome')
  cleartextStream.setEncoding('utf8')
  cleartextStream.pipe(cleartextStream)
})

server.listen(8000, function () {
  console.log('server listening')
})
