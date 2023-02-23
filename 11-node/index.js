// fs模块封装了对文件操作的各种方法，比如同步和异步读写、批量操作、流、监听。

var fs = require('fs')

var assert = require('assert')

//! 1 获取目录下的文件清单：
fs.readdir('../', function (err, fileList) {
  console.info(fileList)
})

//! 2 向文件同步写入内容，再同步读出：

//  写入 👇
var fd = fs.openSync('./test.txt', 'w+')
var write_buf = Buffer.from(
  'something to write 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 4 ！== 8',
)

fs.writeSync(fd, write_buf, 0, write_buf.length, 0)

// 读出 👇
// var read_buf = new Buffer(write_buf.length)
var read_buf = Buffer.from(write_buf)
fs.readSync(fd, read_buf, 0, write_buf.length, 0)

console.info('read 的结果', read_buf.toString())

//! 用断言比较写入和读出的内容是否一致
assert.equal(write_buf.toString(), read_buf.toString())

//! 关闭 ??

fs.closeSync(fd)
