// 图片压缩  imagemin
/*
 *
 *
 * 图片压缩，在很多地方都用的到，是种实用性很高的技术。
 * 国内外还有不少此类平台，专门进行图片压缩，比如tinypng。
 * 而在nodejs中，要实现一个这类平台，不难，很容易。
 * NodeJS中进行图片压缩，可以选择三方模块：Imagemin（https://www.npmjs.com/package/imagemin）。
 */

//  安装遇到麻烦怪事的 可以参考 https://zhuanlan.zhihu.com/p/91035613
// 正常情况下 三个可以直接安装
//  imagemin 在v7.0.1 以上不支持require  npm i imagemin@7.0.1
// npm i imagemin-jpegtran  npm i imagemin-pngquant  这俩直接安装就行

// imagemin压缩效果更好，可以达到50%以上，支持jpg、png格式。
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

;(async () => {
  const files = await imagemin(['./google.png'], {
    // const files = await imagemin(['images/*.{jpg,png}'], {
    destination: 'build/images',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  })

  console.log(files)
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})()
