//! 在22 的例子中 调用一个应用程序的结果 通过另一个应用程序输出 有点绕
//! 是用exefile、spwan调用外部程序
//!  现在可以换一种更便捷的方法  那就是exec

var cp = require('child_process')
cp.exec('echo | netstat -an', function (err, stdout, stderr) {
  if (err) {
    console.error(err)
  }

  console.log('stdout', stdout)
  if (stderr) {
    console.log('stderr', stderr)
  }
})
