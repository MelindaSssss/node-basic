// 为其编译 Node.js 二进制文件的操作系统 CPU 架构。
//  可能的值为：'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、以及 'x64'。

console.info(process.arch)

// 示例  CJS
const { arch } = require('node:process')

console.log(`This processor architecture is ${arch}`)

//  示例 ESM
import { arch } from 'node:process'

console.log(`This processor architecture is ${arch}`)
