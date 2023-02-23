//! 创建DNS请求  查询域名ip

/*
 *
 * 在nodejs中使用http或net模块访问网站时，nodejs是如何识别域名并访问的呢?
 * //! 答案是： nodejs有内置的dns功能  可实现域名到ip的转化
 *
 */

//! 本文将介绍如何在nodejs中创建dns请求，查询域名ip

var dns = require('dns')

dns.lookup('www.baidu.com', function (err, address) {
  // dns.lookup('https://melindasssss.github.io', function (err, address) {
  if (err) {
    console.info('look up err', err)
  }

  console.info('look up addr', address)
})
