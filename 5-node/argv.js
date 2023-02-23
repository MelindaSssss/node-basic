// 使用process.argv可以从命令行获取参数

console.log(process.argv)

const list = process.argv

if (list.length > 0) {
  // 遍历参数
  // for (let i = 0; i < list.length; i++) {
  //   const ele = list[i]
  //   console.info(ele, i)
  // }
  //遍历参数
  list.forEach(function (arg, index) {
    console.log(arg, index)
  })
}

// 隐式的还有两个参数：node.exe本身、脚本。加上参数arg1、arg2，实际上共有4个参数。
