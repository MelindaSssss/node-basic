var cp = require('child_process')

cp.execFile('dir', function (err, stdout, stderr) {
  if (err) {
    console.error(err)
  }
  console.log('stdout:', stdout)
  console.log('stderr:', stderr)
})

// ! execFile时，如果直接调用dir，是不能成功的：

// ! 改成exec 就可以

// ! 在 16.18.1 以后 两个都可以直接调用dir了
