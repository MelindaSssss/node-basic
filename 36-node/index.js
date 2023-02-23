// 利用nodejs开发一个WAF(Web应用防火墙) 中间件 防黑客 防攻击
// WAF  即 web application firewall ,web应用防火墙 防攻击 防黑客的

var express = require('express')
var app = express()

// 当访问根目录时触发

app.get('/', function (req, res) {
  res.send('hello here is WAF')
})

// WAF 中间件

app.use(function (req, res, next) {
  var path = req.url
  console.info('path', path)

  if (!waf_detect(path)) {
    next()
  }
})

//使用正则表达式，检测字符串是否含有攻击特征，检测到攻击特征返回true，没检测到返回false
function waf_detect(str_to_detect) {
  var regexp_rule = [
    /select.+(from|limit)/i,
    /(?:(union(.*?)select))/i,
    /sleep\((\s*)(\d*)(\s*)\)/i,
    /group\s+by.+\(/i,
    /(?:from\W+information_schema\W)/i,
    /(?:(?:current_)user|database|schema|connection_id)\s*\(/i,
    /\s*or\s+.*=.*/i,
    /order\s+by\s+.*--$/i,
    /benchmark\((.*)\,(.*)\)/i,
    /base64_decode\(/i,
    /(?:(?:current_)user|database|version|schema|connection_id)\s*\(/i,
    /(?:etc\/\W*passwd)/i,
    /into(\s+)+(?:dump|out)file\s*/i,
    /xwork.MethodAccessor/i,
    /(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(/i,
    /\<(iframe|script|body|img|layer|div|meta|style|base|object|input)/i,
    /(onmouseover|onmousemove|onerror|onload)\=/i,
    /javascript:/i,
    /\.\.\/\.\.\//i,
    /\|\|.*(?:ls|pwd|whoami|ll|ifconfog|ipconfig|&&|chmod|cd|mkdir|rmdir|cp|mv)/i,
    /(?:ls|pwd|whoami|ll|ifconfog|ipconfig|&&|chmod|cd|mkdir|rmdir|cp|mv).*\|\|/i,
    /(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\//i,
  ]

  for (i = 0; i < regexp_rule.length; i++) {
    if (regexp_rule[i].test(str_to_detect) == true) {
      console.log(
        'attack detected, rule number:',
        '(' + i + ')',
        regexp_rule[i],
      )
      return true
    }
  }
  return false
}

var server = app.listen(8181, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(host, port)
})

//! 模拟访问发起攻击  http://127.0.0.1:8000/index.html 即在url中传入select*from admin语句，这是一句常见的SQL注入攻击语句。 
/* 
可以看到，网站无法打开。在后台输出了拦截信息，并提示出触发了哪条WAF防护规则。

本文只做演示，仅检测了url路径。

那么本代码是可以括展的，可以检测cookie、user-agent、post数据等常见攻击点。



*/
