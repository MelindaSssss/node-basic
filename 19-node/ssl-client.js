var tls = require('tls')
var fs = require('fs')

var options = {
  key: fs.readFileSync('./jshaman.com.key'),
  cert: fs.readFileSync('./jshaman.com.pem'),
  servername: 'www.jshaman.com',
}

var cleartextStream = tls.connect(8000, options, function () {
  console.log('connected to server')
  process.stdin.pipe(cleartextStream)
})

cleartextStream.setEncoding('utf8')

cleartextStream.on('data', function (data) {
  console.log(data)
})

/* 

客户端用tls.connect()方法去连接服务器。

参数options中除了包含刚才用到的key、pem文件内容，还加了一个参数：

servername，这个名称必须与服务器端的证书名称相对。*/

/*
本文用的证书，是www.jshaman.com这个网站的，所以key和pem文件中都是这个域名的信息。那么在这里，servername名称也必须用这个。否则连接会不成功。 
 */
