/* 
Buffer是NodeJS的重要数据类型，很有广泛的应用。

Buffer是代表原始堆的分配额的数据类型。在NodeJS中以类数组的方式使用。
*/
// const { Buffer } = require('node:buffer')

// 创建长度为 5 的以零填充的缓冲区。
// var buf1 = Buffer.alloc(5)

// console.info(buf1)

// 创建长度为 10 的缓冲区，
// 使用值为 `68` 的字节填充。
// var buf2 = Buffer.alloc(10, 68)

//  填充的字节 从十进制转化为 16 进制（其实存的是二进制 只是为了方便观看 展示的是 十六进制 ）
//  25 --> 19  68 --> 44

/*
 *   在计算机内使用二进制表示数据，一个存储空间叫做一个 bit ，只能存储 0 或是 1。 通常，计算机把 8 个bit作为一个存储的单位，称为一个 Byte。
 *    于是一个 Byte 可以出现 256 种不同的情况。
 *    一个 Buffer 是一段内存，比如大小为 2（Byte）的buffer，一共有 16 bit ，比如是 00000001 00100011 ，
 *    可是这样显示太不方便。所以显示这段内存的数据的时候，用其对应的 16 进制就比较方便了，是 01 23，之所以用 16 进制是因为转换比较方便。
 *    内存仅仅存储的是二进制的数据，但是如何解释就是我们人类自己的事情了。。。。
 *    比如A 在 内存中占用两个Byte，对应的内存状态是 0000000 01000001，而uint16(JS不存在这个类型) 类型的 65 对应的存储内存的状态也是这个。
 *    如果输出 Buffer 那么nodejs 输出的是内存实际存储的值(因为你没有给出如何解释这段内存中的数据)，
 *    可是二进制显示起来不方便看，所以转换为 16 进制方便人类阅读。
 *    如果转换为数组，那么意思就是把这个 buffer 的每一个字节解释为一个数字（其实是10进制数字，这是人类最方便的），
 *    所以是 0～255 的 10 进制数字。
 */

// console.info(buf2)

var fs = require('fs')

// 异步地读取文件的全部内容。
fs.readFile('./index.js', function (err, bufferData) {
  console.info(bufferData)
  console.info(Buffer.isBuffer(bufferData))

  // 转化成其他格式展示
  console.info(bufferData.toString())
  // 会将 index.js  这个文件原样以string展示
})
