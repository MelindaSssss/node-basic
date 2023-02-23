/* 
https服务器
上面的例子中，是用tls创建了一个tcp加密服务器。

接下来，再讲一段，如何用https创建https服务器。

疑问：tcp加密服务器、https服务器，一回事吗？

这样理解：ssl加密通信服务器，可以有多种。比如可以是web服务器，也可能是邮件服务器。 */

var fs = require('fs')
var https = require('https')

var options = {
  key: fs.readFileSync('./jshaman.com.key'),
  cert: fs.readFileSync('./jshaman.com.pem'),
}

var server = https.createServer(options, function (req, res) {
  console.log('connected')
  res.write('welcome')
  res.end()
})

server.listen(8000, function () {
  console.log('server listening')
})
