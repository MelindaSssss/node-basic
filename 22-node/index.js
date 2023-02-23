// todo 外部应用程序中的串联调用
//! 如果调用多个外部程序  而且希望第一个调用的返回内容作为第二个调用的参数 该如何实现

// todo 第一步 首先执行 执行netstat -an;  可以得到一大串活动链接信息
/* 
netstat 的命令用来显示网络状态。

在InternetRFC标准中，Netstat的定义是：
 Netstat是在内核中访问网络连接状态及其相关信息的程序，
 它能提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。
 Netstat是控制台命令,是一个监控TCP/IP网络的非常有用的工具，
 它可以显示路由表、实际的网络连接以及每一个网络接口设备的状态信息。
 Netstat用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，
 一般用于检验本机各端口的网络连接情况。

*/

// todo  第二步  把上面执行的结果用echo打印出来。

var cp = require('child_process')
var netstat = cp.spawn('netstat', ['-an'])
var echo = cp.spawn('cmd', ['echo'])

netstat.stdout.pipe(echo.stdin)
echo.stdout.pipe(process.stdout)

/*

代码解析：

1、dir和echo两个变量，分别是进行netsta和echo命令的执行。

2、netstat.stdout.pipe(echo.stdin)是将netstat的执行结果，通过管道输出给echo的输入。

3、再用echo.stdout.pipe(process.stdout)将echo的输出内容，以管道输出给process.stdout，以实现将内容打印到命令行中。
 */

/* 
 注意到与上方netstat -an执行结果的差异了吗？

异同在于，这里的输出，中间有空格。这是因为输出是实时进行的，netstat -an获得一个内容，会立刻传给echo，echo又通过process.stdout打印出来。


*/
