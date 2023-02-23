//! 利用nodejs  的 http相关模块开发一个正向代理服务器

/*
 *
 * 我们在浏览网站时，浏览器直接与网站服务器进行通信。如果在本地建立一个代理服务器，浏览器通过它，再与网站通信，
 * 那么这台服务器就是正向代理服务器。
 * 正向代理服务器常用于代理上网、数据截取分析等。
 *
 */

/*
 *
 *  题外话：
 *  有正向代理，就有反向代理
 *  与正向代理相对应，反向代理服务器设在网站一方
 *  当用户通过浏览器访问网站时，数据由该反向代理服务器接收，再转发给网站服务器，这种代理服务器，称之为反向代理服务器
 *  反向代理常用于网站防护，WAF（Web应用防火墙），就是典型的反向代理服务器WAF
 *  换个角度看：客户端用的是正向代理服务器，服务端用的是反向代理服务器
 *
 *
 * */

var http = require('http')

var url = require('url')

http
  .createServer(function (req, res) {
    console.info('start request', req.url)

    const reqUrl = req.url
    var option = url.parse(reqUrl)
    option.headers = req.headers

    //代理请求
    var proxyRequest = http.request(option, function (proxyResponse) {
      // 开始
      proxyResponse.on('data', function (chunk) {
        console.info('chunk', chunk.length)
      })

      proxyResponse.on('end', function () {
        console.info('proxy request ended')
        //  最后一定要end
        res.end()
      })

      res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
    })

    req.on('data', function (chunk) {
      console.info('in request length', chunk.length)
      proxyRequest.write(chunk, 'binary')
    })

    req.on('end', function () {
      console.info('original request ended')
      proxyRequest.end()
    })
  })
  .listen(8000)
