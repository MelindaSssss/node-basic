//! 文件锁 使用文件锁，可以防止一个文件同时被多人做出修改，以导致文件内容损坏等问题。
/* 
使用独占标记创建锁文件
fs打开文件时，可以使用一个x标记，这个标记可以让文件以独占方式打开，即：你打开后，别人就不能再打开。
*/

var fs = require('fs')

fs.open('./lock_test.txt', 'wx', function (err, fp) {
  if (err) return console.error(err)
  // 如果想关闭怎么办
  fs.close(fp)
})
