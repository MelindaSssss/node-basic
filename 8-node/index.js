var zlib = require('zlib')

//! 压缩
zlib.deflate(
  'melinda is a fairy,and she is a beautiful girl ,and she is good at cooking',
  function (err, deflate_buf) {
    console.info(deflate_buf.toString())

    //! 解压
    zlib.inflate(deflate_buf, function (err, inflate_buf) {
      console.info(inflate_buf.toString())
    })
  },
)
