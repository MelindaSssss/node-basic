const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

console.info(myEmitter)

/*
 *
 * 当 EventEmitter 对象触发事件时，所有绑定到该特定事件的函数都会被同步地调用。
 *  被调用的监听器返回的任何值都将被忽略和丢弃。
 * 以下示例展示了使用单个监听器的简单的 EventEmitter 实例。
 *  eventEmitter.on() 方法用于注册监听器，eventEmitter.emit() 方法用于触发事件。
 *
 */
//! 响应自定义 event事件
myEmitter.on('event_name_diy', (arg1, arg2) => {
  console.info('on 的  callback --- 111', arg1, arg2)
})

myEmitter.on('event_name_diy', (arg1, arg2) => {
  console.info('on 的  callback --- 2222', arg1, arg2)
})

//! 触发自定义事件
setTimeout(() => {
  myEmitter.emit('event_name_diy', '今天是', '星期四')
}, 2000)

//! 可以定义多个事件监听器 意味着 一处触发 可以多处响应
//! 多个个事件监听器回调函数按照写的顺序被先后调用
