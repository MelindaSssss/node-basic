//  可以利用base64编码进行 字符串加解密

var user = 'melinda'

var pass = 'fairysoftware.com'

var auth_str = user + ':' + pass

console.info(auth_str)
// 在新版本 已不被允许了
// var buffer = new Buffer(auth_str)

var buffer = Buffer.from(auth_str)

console.info(buffer)

//! 加密过程 转为base64编码

var encode = buffer.toString('base64')

console.info(encode)

//! 解密过程
var decode = Buffer.from(encode, 'base64').toString()

console.info(decode)
