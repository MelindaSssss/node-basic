// 利用nodejs重启服务器

//! 场景一 当文件被修改时 自动重启服务器
// 这里的文件 可能是服务器主程序 比如修改了程序 也可以是其他依赖文件

// 例如 server.js是服务器文件 index.js 用于启动监测server.js 当server.js文件内容发生变化时  自动重启之
var fs = require('fs')
var exec = require('child_process').exec

function watch() {
  var child = exec('node server.js')
  var watcher = fs.watch('./server.js', function (event) {
    console.info('file changed ,reload')

    child.kill()
    watcher.close()
    watch()
  })
}

watch()

//! 场景二 高稳定性需求 作为服务器程序的守护进程 当发现服务器意外终止时 重启之
// 比如 守护进程每10秒与主进程通话一次 万一发现主进程没有回应 就重启它  

