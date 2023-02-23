//! 核心模块

var fs = require('fs')

var event_emitter = require('events').EventEmitter

//! 我们的数据库  初始化参数是数据库路径 (包含文件名)

var database = function (path) {
  this.path = path
  this.records = Object.create(null)
  // 流 ，进行写操作
  this.write_stream = fs.createWriteStream(this.path, {
    encoding: 'utf8',
    flags: 'a',
  })

  // 加载初始化
  this.load()
}

// 类式继承 让database具备事件能力

database.prototype = Object.create(event_emitter.prototype)

// 异步操作 通过EventMitter 实现:在加载完记录后 发出load事件.

database.prototype.load = function () {
  // 流 读文件
  var stream = fs.createReadStream(this.path, {
    encoding: 'utf8',
  })

  // console.info('stream===>', stream)
  var database_this = this
  var data = ''

  // 流的读取事件
  stream.on('readable', function () {
    data += stream.read()

    console.info('读取到的data', data)
    // 以换行为分割
    var record_stream = data.split('\n')
    data = record_stream.pop()
    const len = record_stream.length
    for (let i = 0; i < len; i++) {
      var record = JSON.parse(record_stream[i])
      // 判空

      if (record.value === null) {
        if (this.records) {
          delete this.records[record.key]
        }
      } else {
        database_this.records[record.key] = record.value
      }
    }
  })

  // 读取完成 事件
  stream.on('end', function () {
    // 把方法暴露出去
    database_this.emit('load')
  })
}

//! 根据key值 返回对应的value

database.prototype.get = function (key) {
  return this.records[key] || null
}

//! 写入数据库
database.prototype.set = function (key, value, cb) {
  var to_write = JSON.stringify({ key: key, value: value }) + '\r\n'

  if (value === null) {
    delete this.records[key]
  } else {
    console.info('现在写入的key', key, value)
    this.records[key] = value
  }

  //! 写入
  this.write_stream.write(to_write, cb)
}

//! 删除
database.prototype.del = function (key, cb) {
  return this.set(key, null, cb)
}

// 导出模块
module.exports = database

/* 
 重点解析：

1、EventEmitter继承，让本模块具有“事件”触发能力，可以在调用时使用on函数；

2、实例化时，输入数据库路径（如不存在，会自动创建）；

3、load、get、set、del函数的实现；

4、回车换行，\r\n；

5、emit触发load事件，load事件会在调用上层响应；

6、为什么用pop（）；
*/
