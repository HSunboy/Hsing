const net = require('net')
const fs = require('fs')
const path = require('path')
const userConf = require(path.join(process.cwd(), '/hsing.conf.js')).client
const logger = require('./cloudUtil/logger.js')
const zipUtil = require('./cloudUtil/zipUtil.js')
const zipPath = path.join(process.cwd(), '/src/')
const outputPath = path.join(process.cwd(), './.hsing/tmp.zip')
if (!fs.existsSync(path.join(process.cwd(), '/.hsing'))) {
  fs.mkdirSync(path.join(process.cwd(), '/.hsing'))
}
const socket = new net.Socket({
  readable: true,
  writable: true
})
let fileloading = false
socket.on('data', function (data) {
  if (fileloading) {
    return
  }

  let msg = JSON.parse(data)
  if (msg) {
    switch (msg.type) {
      case 'normal':
        logger('服务器消息（普通）:' + msg.content)
        if (msg.content === '登陆成功') {
          logger('启动文件上传服务')
          fileSocket()
        } else if (msg.content === '登陆失败') {
          process.exit(-1)
        }

        break
      case 'connect':
        logger('服务器消息（connect）:' + msg.content)
        login(socket)

        break
      case 'file':
        if (msg.content === 'fileover') {
          logger('发现文件下载请求')
          fileloading = true
          socket.write(setFile())

          let fget = fs.createWriteStream(path.join(process.cwd(), './tmp.zip'))
          fget.on('finish', function (err) {
            fileloading = true
            logger('文件下载结束')
          })
          fget.on('error', function (err) {
            fileloading = true
            logger(err)
          })

          socket.pipe(fget)
        }

        break

      default:
        break
    }
  }
})
socket.on('close', function () {
  logger(' 主服务关闭 ')
})
socket.on('end', function () {
  logger('主服务断开连接')
})

socket.on('error', function (err) {
  logger(' 主服务error: ' + err)
})
socket.connect({
  host: userConf.ip,
  port: userConf.port
}, function () {
  logger('主服务连接成功')
})

function login (socket) {
  var msg = {
    type: 'login',
    username: userConf.username,
    password: userConf.password
  }

  socket.write(JSON.stringify(msg))
  logger('主服务：登陆中.....')
}

// function setMsg (text) {
//   var msg = {
//     type: 'normal',
//     content: text
//   }

//   socket.write(JSON.stringify(msg))
// }

function setFile () {
  return JSON.stringify({
    type: 'sendfile'
  })
}

// function sendZipover () {
//   var msg = {
//     type: 'file'
//   }
//   socket.write(JSON.stringify(msg))
// }

// function sendZiptype (socket) {
//   var msg = {
//     type: 'file'
//   }
//   socket.write(JSON.stringify(msg))
// }

function sendStream (socket) {
  var fileStream = fs.createReadStream('./.hsing/tmp.zip')
  fileStream.on('end', function () {
    logger('文件传输客户端传输完成')
  })

  fileStream.pipe(socket)
}
// 文件socket
function fileSocket () {
  new Promise(function (resolve) {
    zipUtil.packZip(zipPath, outputPath, resolve, path.join(process.cwd(), './hsing.conf.js'))
  }).then(function () {
    let client = new net.Socket({
      readable: true,
      writable: true
    })
    client.connect({
      host: userConf.ip,
      port: userConf.port
    }, function () {
      logger('文件传输客户端连接')
      logger('文件传输客户端发送传输请求')
    })
    client.on('data', function (data) {
      if (data) {
        var d = JSON.parse(data)
        if (d) {
          logger('文件传输客户端-服务器消息*****:' + d.content)
          if (d.content === 'success') {
            logger('文件传输客户端开始传输')
            sendStream(client)
          }
          if (d.type === 'connect') {
            client.write(JSON.stringify({
              type: 'file'
            }))
          }
        }
      }
    })
    client.on('close', function () {
      logger(' 文件传输客户端断开连接')
    })
    client.on('end', function () {
      logger('文件传输客户端结束')
    })

    client.on('error', function (err) {
      logger(' 文件传输客户端 error: ' + err)
    })
  }).catch(function (e) {
    logger(e)
  })
}
