//! 高级用法

// function Bomb() {
//   console.info('Bomb')
//   this.message = 'Bomb de message'
// }

// Bomb.prototype.explode = function () {
//   console.info(this.message + '原型shuchu')
// }

// var result = new Bomb()

// result.explode()
// console.info(result.explode())
// setTimeout(() => {
//   result.explode.bind(Bomb)
// }, 2000)

var melinda = {
  name: 'melinda',
}

var friendA = {
  name: '朋友A',
  sendMsg: function (target, content) {
    console.log(this.name + '给' + target + '发送了' + content)
  },
}

var action = friendA.sendMsg.bind(melinda)
action('张点点', '我们晚上六点去你妈家吧')
