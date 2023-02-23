var fs = require('fs')

//! 监视 test.js文件的变动
fs.watchFile(
  './test.js',
  {
    persistent: true,
    interval: 300,
  },
  function (status) {
    if (status) {
      console.info('file change status', status)
    }
  },
)
