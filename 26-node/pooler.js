//! 接收worker消息 用工作池(线程池) 完成工作 并反馈给主程序
var cp = require('child_process')

//! 获取cpu数量 有几个cpu就创建几个子进程 这样就可以最大化地利用机器性能
var cpus = require('os').cpus().length

/* 
总核数 = 物理CPU个数 X 每颗物理CPU的核数
总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数
*/

// 模块导出函数
module.exports = function (workModule) {
  console.info('cpus', cpus)
  // 本电脑的是 1 * 1 * 8 = 8

  // 等待任务队列 当工作任务被下发 但没有闲工作进程时  将其放到此队列
  var awaiting = []

  // 存放准备就绪的工作进程
  var readyPool = []

  // 当前的工作子进程数量(工作池 线程池的大小)
  var poolSize = 0

  return function doWork(job, cb) {
    // 如果工作池数量已经最大 并且没有准备就绪的工作子进程 也就是所有工作子进程都在工作中 那么：排队等待
    if (readyPool.length && poolSize > cpus) {
      //压入到等待队列 等待后续处理
      return awaiting.push([dowork, job.cb])
    }

    // 取得一个可用的工作子进程 或fork（分叉）一个新的子进程(增加工作池、线程池的大小)
    var child = readyPool.length
      ? readyPool.shift()
      : (poolSize++, cp.fork(workModule))

    //! 不知道写个大括号是什么意思
    {
      // 子进程是否完成回调的标记
      var cbTriggered = false

      // 初始阶段 移除子进程上的监听 确保每个子进程只拥有一次监听
      child.removeAllListeners()

      // 错误
      child.once('error', function (err) {
        // 未回调
        if (!cbTriggered) {
          // 回调返回为错误
          cb(err)

          // 回调标识为true  已回调
          cbTriggered = true
        }
        // 结束子进程

        child.kill()

        //  这里不用操作工作池poolSize-- ，因为kill事件会触发exit事件，在exit事件中操作工作池
      })

      // 子进程退出了 可能是不明原因的意外退出 或者是被kill()都会触发

      child.once('exit', function (code, signal) {
        // 未回调
        if (!cb.cbTriggered) {
          // 回调 返回信息
          cb(new Error('child exited with code:' + code))
        }

        // 工作池 (正在工作的子进程数) 大小减一
        poolSize--

        // 退出的子进程  是否在准备好的子进程数组中
        var childIdx = readyPool.indexOf(child)
        if (childIdx > -1) {
          // 从准备好的子进程数组中移除
          readyPool.splice(childIdx, 1)
        }
      })

      //  获取父进程发来的消息

      child
        .on('message', function (msg) {
          console.info('pool get msg:' + msg)
          cb(null, msg)
          cbTriggered = true
          readyPool.push(child)

          // 如果等待区有内容 则直接处理
          if (awaiting.length) {
            // 执行异步代码，并且想尽可能快的执行 任何传给setImmediate()的函数参数，
            // 都是在事件循环（event loop）的下一个迭代被调用执行。
            setImmediate.apply(null, awaiting.shift())
          }
          // 向父进程发消息
        })
        .send(job)
    }

    //  child区域结束
  }
}
