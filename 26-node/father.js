var http = require('http')

var makePool = require('./pooler')
var runJob = makePool('./worker')

http
  .createServer(function (req, res) {
    runJob('some dummy job', function (er, data) {
      console.log('father callback get:', data)
      if (er) {
        return res.end('get an error:' + er.message)
      }
      //! 不把这个注掉  会报错  **Error [ERR_STREAM_WRITE_AFTER_END]: write after end**
      // res.end('work pool from father page')
    })
  })
  .listen(8989)

// todo  当有终端访问时，触发runJob  开始启动工作
