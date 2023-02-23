// setTimeOut 在nodejs中，通过setTimeout函数可以达到延迟执行的效果，这个函数也常被称为定时器。

// console.log(new Date().getSeconds())

// setTimeout(() => {
//   console.info(new Date())
//   console.info('hello 定时器')

//   // 延迟2000毫秒 也就是2s执行
// }, 2000)

// 常用setTimeout来实现异步操作。

//! setInterval
let count = 1
const interValId = setInterval(() => {
  console.info(count++)
}, 2000)

clearInterval(interValId)
