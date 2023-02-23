var module = require('./module')

// console.info(module.method111())
// console.info(module.method222())

// 卸载模块
console.log(require.cache)

delete require.cache[require.resolve('./module.js')]

console.log('已卸载模块')

console.info(require.cache)
