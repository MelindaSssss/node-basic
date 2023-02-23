const data = {
  yuanqi: 'youhefang',
  number: 12478,
}
process.send(data)

/* 
1、发送一条消息给进程；

2、当收到父进程消息时，输出消息
*/
process.on('message', function (msg) {
  console.info('[child get msg]', msg)
})
