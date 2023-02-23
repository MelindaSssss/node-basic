/* 
 如果想要实现这样一个功能：
 一个web服务器，需要将外部程序输出实时展示给客户端
 通过spawn使用流，可以实现这个需求
 它和之前学过的execFile的使用方法非常相似，但是这个之所以选择spawn是因为流是实时传播的数据，
 对于大量数据，不必预先缓存，可以极大地提高响应效率
*/

var cp = require('child_process')

var child = cp.spawn('ping', ['www.baidu.com'])
child.on('error', console.error)
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
