/* process.memoryUsage()可以获取当前进程的内存使用情况，它有三个方法：

rss：常驻内存大小；

heapTotal：动态分配的可用内存；

heapUsed：已使用堆大小。
external : 指的是绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量。.
arrayBuffers: 是指为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer。 
              这也包含在 external 值中。 
              当 Node.js 被用作嵌入式库时，此值可能为 0，因为在这种情况下可能不会跟踪 ArrayBuffer 的分配。
*/

console.log(process.memoryUsage())

// 返回描述 Node.js 进程的内存使用量（以字节byte为单位）的对象。
/* 

  rss: 26238976,
  heapTotal: 4476928,
  heapUsed: 2724840,
  external: 889742,
  arrayBuffers: 9898

   除1024获取的是KB，再除1024获取的是MB，再除1024获取的是GB。
*/
