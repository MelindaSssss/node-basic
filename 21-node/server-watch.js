//! 对代码稍作修改 改写为一个web服务器  通过流向客户端实时反馈信息

var http = require('http')

http
  .createServer(function (req, res) {
    var cp = require('child_process')

    //! 代码中，给ping传参数：-t，可以使ping不停的进行，这样可以方便我们从浏览器里确认是否数据是实时回传，而不是执行完之后再发送到客户端：
    var child = cp.spawn('ping', ['-t', 'www.baidu.com'])

    child.on('error', console.error)
    child.stdout.pipe(res)
    child.stderr.pipe(res)
  })
  .listen(8989)

// TODO  打开 127.0.0.1：8989 可以看到一长串来自XXX的回复 字节=XX 时间=XX TTL=XXX
//! 说明spwan是实时将外部执行结果传送给了web服务器，web服务器又通过管道（pipe）以流的方式将数据传到了客户端浏览器。
