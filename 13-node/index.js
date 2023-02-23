//! 利用fs开发一个简单的文件型数据库
/* 
  数据库重，记录将采用json模型 内容形如：
  {"key":"car_num","value":"123456"}
  支持查询 更新 删除操作 
  代码分为两部分，一部分是我们将其写成模块，另一部分是对该模块的调用
*/

//此文件为调用文件 主文件为database.js

var database = require('./database')

// console.info(database, '这是自己的数据库')

var client = new database('./test.db')
// console.info('client', client)
/* 
重点解析：

1、初始始化模块、传入数据库路径；

2、响应load事件，即：数据库加载完成；

3、读取、设置、删除各函数的调用。
*/
client.on('load', function () {
  console.info('client loaded')

  const target = client.get('my_site')
  console.log(target)

  client.set('my_site', 'MelindaSsss + 1111111111', function (err) {
    console.log('write', err)
  })

  client.del('test2')
})
