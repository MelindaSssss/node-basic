//!  fs  高级技巧  文件监视和文件锁
// fs 模块同样有流接口 如下例：

var fs = require('fs')

var read_able = fs.createReadStream('1.txt')
var write_able = fs.createWriteStream('2.txt')

read_able.pipe(write_able)

//! 👆 当这段代码执行时，会将1.txt中的内容通过pipe“同步”到2.txt中，相当于从1.txt中读取，再写入2.txt ，2.txt 原来的内容被覆盖了
