// const stream = require('stream')

// console.info(stream)

//! 先使用node内置的核心模块http实现一个简单的静态web服务器

var http = require('http')
var fs = require('fs')
var zlib = require('zlib')

http
  .createServer(function (req, res) {
    //! 1 基本方法 如果是大文件 就会有效率问题 会很慢
    // fs.readFile('./index.js', function (err, fileData) {
    //   console.info('fileData', fileData)
    //   if (err) {
    //     res.statusCode = 500
    //     res.end(String(err))
    //   } else {
    //     res.end(fileData)
    //   }
    // })

    //! 2 使用流的方式读取，通过管道（pipe）传给res。

    // fs.createReadStream('./index.js').pipe(res)

    /*
     *
     *  执行效果一样，但对内存的使用得到优化，性能得到提升。
     *  同时，代码也更简洁。
     *  流不仅高效优雅，扩展性也更强。比如对上面的代码稍做改动，就可以实现gzip压缩传输数据，可以使网页打开更快。
     */

    //! 3 功能连用  利用流实现压缩功能
    res.writeHead(200, { 'content-encoding': 'gzip' })
    fs.createReadStream('./index.js').pipe(zlib.createGzip()).pipe(res)
  })
  .listen(1337)
