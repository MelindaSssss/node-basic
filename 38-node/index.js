// 一种 nodejs源代码保护方式 ，将nodejs代码编译成字节码
/*
 *
 *
 *
 *  把nodejs代码转化为字节码，用node启动字节码文件的方式，保护nodejs源代码不泄漏。
 *  可应用于nodejs项目提交源码、nodejs产品在不可信的环境中部署，防止别人获取源码。
 *  如同JS代码一样，nodejs源码，也是透明代码，通常用node启动代码时，都必须把源码也放置到启动环境中。
 *  这在很多时候是不安全不稳妥的。因为js源码透明的原因，别人可以直接获取到产品或项目源码。
 *  如果是为第三方定制项目，对方可以直接拿到源码。
 *  如果是要在某些环境中启动项目，比如虚拟主机、他人的服务器中，源码的也是很令人担心的。
 *  为了防止源码泄漏带来的一系列令人不安的后果，这里介绍一种专门针对于nodejs源码的保护技术：将nodejs代码转化为字节码文件。
 *
 * */

//! 实现原理 ： nodejs的内核中对于js的解析 使用的是谷歌的v8引擎 v8引擎内置js虚拟机  通过v8虚拟机 可以将js代码编译为字节码
//! 而V8虚拟机时能够直接识别和直接运行该字节码的  因此，以下逻辑成为可能
//!     js代码 -> js字节码
//!     js字节码 -> nodejs ->运行

var v8 = require('v8')
const vm = require('vm')
var fs = require('fs')

// 读取源文件 （js源代码）

var js_code = fs.readFileSync('./test.js').toString()

// 生成字节码
var script = new vm.Script(js_code, {
  produceCachedData: true,
})

var byte_code = script.cachedData

// 将字节码写入文件

fs.writeFileSync('./test.jsb', byte_code)
