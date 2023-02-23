var cp = require('child_process')
// cp.execFile('ping', ['www.baidu.com'], function (err, stdout, stderr) {
//   if (err) {
//     console.error(err)
//   }
//   console.info('stdout', stdout.toString())
// })

/*
 *
 * 程序解读：
 * 1、引用nodejs内置模块child_process；
 * 2、用execFile方法调用外部程序。
 * execFIle的第一个参数是要调用的程序，
 * 第二个参数，需要放在数组里，是传给外部程序的参数。
 * 第三个参数是回调函数，在回调中，可以取得外部程序的执行结果。
 *
 * */

//! 除了命令行程序，当然也可以打开窗口应用程序，比如打开记事本，对代码稍做修改：
cp.execFile('notepad', function (err, stdout, stderr) {
  if (err) {
    console.error(err)
  }
  console.info('stdout', stdout.toString())
})
