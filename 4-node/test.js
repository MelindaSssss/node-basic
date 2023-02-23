process.stdin.resume()
process.stdin.setEncoding('utf-8')
// 程序将接收输入，处理并做输出：
process.stdin.on('data', function (text) {
  // console.info('text==?是', text)
  process.stdout.write(text.toUpperCase())
  // 这个流程并没有结束  只是接收了流并做了一些输出处理
})
