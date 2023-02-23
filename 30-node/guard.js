/*
 * 守护进程 功能 ：检测主进程(设置名称为abc 下同) 工作是否正常 如出现异常：无法访问，则对其进行重启
 * 本程序可以用forever启动 防止本进程异常退出 达到双重守护效果 前提是要安装forever npm i xxx
 *
 */

process.env.UV_THREADPOOL_SIZE = 128

const { exec } = require('child_process')
var request = require('request')
/*
 * 启动abc
 */

function start_abc() {
  exec('forever start abc.js', function (err, stdout, stderr) {
    if (err) {
      console.info('exec error:' + err)
      return
    }

    console.info('stdout:' + stdout)
    console.info('stderr:' + stderr)
  })
}

/*
 * 关闭abc
 */

function stop_abc() {
  exec('forever stop abc.js', function (err, stdout, stderr) {
    if (err) {
      console.info('exec error:' + err)
      return
    }

    console.info('stdout:' + stdout)
    console.info('stderr:' + stderr)
  })
}

// 启动abc
start_abc()

// abc地址和端口
var abc_host = 'http://127.0.0.1:8080/'
// var abc_host = 'http://127.0.0.1:' + require('./config.js').shield_port + '/'

console.info('abc address', abc_host)

// 每10秒检测一次abc服务是否正常

setImmediate(() => {
  // 访问abc
  request.get(abc_host, { timeout: 5000 }, function (err) {
    if (err != null) {
      if (
        err.code === 'ETIMEDOUT' ||
        err.code === 'ECONNREFUSED' ||
        err.code === 'ESOCKETTIMEDOUT'
      ) {
        // 重启
        stop_abc()
        start_abc()
      } else {
        console.log('Error', err.code)
      }
    }
  })
}, 10000)

/*
 *
 * abc的高稳定性，除了用子进程监测方式，本身还使用了三方模块forever，
 * forever（https://www.npmjs.com/package/forever）也具有同本代码所示一样的效果，如果用forever启动的程序意外中止，也会被自动重启。
 *
 *
 */
