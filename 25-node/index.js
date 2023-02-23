//! 大运算量 用Fork 让子进程来做

/* 
   实际项目中 很多时候都会有这种情况：某些功能是有大数据量运算的 或者是需要进行很消耗资源的操作
   在这种情况下 如果在主线程中处理  会严重威胁主线程的整体性能
   合理的方法是：把可能对主线程造成压力的工作量 放到主进程里面去 让子进程去独立完成
*/
//! child_process  有一个fork(分叉)方法 可以满足上面的想法

var cp = require('child_process')

child = cp.fork('./child.js')

/*
  
 代码解析：

1、创建子进程、发子进程发一条消息；

2、当收到子进程发来的消息时，输出消息。 
 */
child.on('message', function (msg) {
  console.info('[father get message]', msg)
})

child.send('this is a message from father ,send to child')

// ! 进程间发送数据的类型不会丢失，比如发送JSON值，收到的也是JSON值，不会变成字符串。
