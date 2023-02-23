const http = require('http')

// 代理目标的主机和端口号
const proxyHost = '目标主机名或IP地址'
const proxyPort = '目标端口号'

const server = http.createServer((req, res) => {
  // 构建代理请求选项
  const proxyOptions = {
    hostname: proxyHost,
    port: proxyPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  }

  // 发送代理请求
  const proxyReq = http.request(proxyOptions, (proxyRes) => {
    // 将代理响应转发给客户端
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  // 将客户端请求体数据发送给代理服务器
  req.pipe(proxyReq, { end: true })

  // 监听代理请求错误事件
  proxyReq.on('error', (err) => {
    console.error(`代理请求错误: ${err.message}`)
    res.statusCode = 502 // Bad Gateway
    res.end(`代理请求错误: ${err.message}`)
  })
})

// 启动代理服务器
const port = 8080 // 代理服务器监听的端口号
server.listen(port, () => {
  console.log(`代理服务器已启动，监听端口号：${port}`)
})
