;(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require
          if (!f && c) return c(i, !0)
          if (u) return u(i, !0)
          var a = new Error("Cannot find module '" + i + "'")
          throw ((a.code = 'MODULE_NOT_FOUND'), a)
        }
        var p = (n[i] = { exports: {} })
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r]
            return o(n || r)
          },
          p,
          p.exports,
          r,
          e,
          n,
          t,
        )
      }
      return n[i].exports
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i])
    return o
  }
  return r
})()(
  {
    1: [
      function (require, module, exports) {
        module.exports = function abc(a, b) {
          return a + b + '哈哈哈 这是abc模块'
        }
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        // 在浏览器端使用Node模块
        // 正常理解来说  Nodejs是应用于服务端 后端的
        //  但是nodejs编写的代码 也是能运行于客户端 前端的 包括require方法组织的代码
        //  要实现这一点 需要借助于三方模块  Browserify (http://browserify.org/)

        // 它是一个将nodejs代码 进行打包 以使之能在浏览器环境使用
        // 简单示例

        var abc = require('./abc.js')

        document.getElementById('result').innerHTML = abc(100, 200)
      },
      { './abc.js': 1 },
    ],
  },
  {},
  [2],
)
