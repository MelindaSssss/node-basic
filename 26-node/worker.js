process.on('message', function (job) {
  console.info('worker get message', job)

  for (var i = 0; i < 10; i++) {
    console.info('worker send', job, i)
    process.send('由worker发出的信息 ，finish job:' + job + i)
  }
})
