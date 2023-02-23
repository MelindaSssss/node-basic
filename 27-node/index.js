// 同步执行的子进程
// 在前几篇中  已经了解过 execFile spawn exec 几种创建子进程的方法 ，但是它们所创建的子进程都是异步的
// 但是有的时候 需要同步执行 即：希望得到它们的执行结果 再继续运行程序
// 就可以采用 execFileSync 方式啦
//! 1. execFileSync它是 execFile的同步方法 使用如下：
// var ex = require('child_process').execFileSync
// var stdout = ex('ping', ['www.baidu.com']).toString()

// console.info(stdout)

//! 2 spawnSync 是spawn的同步方法 注意       👇    多了一个stdout

// 使用示例如下
// var ex = require('child_process').spawnSync
// var stdout = ex('ping', ['www.baidu.com']).stdout.toString()
// console.info(stdout)

// ! 3.execSync  👇 注意，这里不能使用ping了，因为它不是一个command：
// 使用示例如下
var ex = require('child_process').execSync
var stdout = ex('dir').toString()
console.info(stdout)
