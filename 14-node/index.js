//! 实现一个简单的tcp服务器
/* 
  本文将会展示如何用node.js内置的net模块开发一个TCP服务器  同时模拟一个客户端 并实现客户端和服务端交互
  net模块是node.js内置的基础网路模块 通过使用net 可以创建一个简单的TCP服务器
  
*/

var net = require('net')

// console.info(net)

// 初始化客户端连接数据量
var clients_num = 0

var server = net.createServer(function (client_target) {
  // 客户端数量
  clients_num++
  var client_id = clients_num

  console.info('client connected  ==> 连上啦', client_id)

  // 断开连接

  client_target.on('end', function () {
    console.info('client disconnected  ==> 断开连接啦', client_id)
  })

  // 发送信息给连接客户端

  client_target.write('welcome client' + client_id + '\r\n')

  //利用pipe传递信息
  client_target.pipe(client_target)
})

// 用某端口监听

server.listen(3030, function () {
  console.log('server started on port 3030')

  // 模拟一个客户端
  // run_test('857545745')
})

/* 
    当服务器启动时，模拟一个客户端进行连接。

    当客户端收到信息时，输出信息。

    执行效果如下：
*/
function run_test(id) {
  var client = net.connect(3030, '127.0.0.1')

  client.on('data', function () {
    console.log('id==', id)
  })
  client.on('end', function () {
    console.log('end')
  })
}
