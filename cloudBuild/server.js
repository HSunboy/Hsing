const net = require('net')
const fs = require('fs')
const path = require('path')
const userConf = require(path.join(process.cwd() + '/hsing.conf.js')).server
const logger = require('./cloudUtil/logger.js')
const zipUtil = require('./cloudUtil/zipUtil.js')
const connectMap = {}
if (!fs.existsSync(path.join(process.cwd(), '/.hsing'))) {
  fs.mkdirSync(path.join(process.cwd(), '/.hsing'))
  fs.mkdirSync(path.join(process.cwd(), '/.hsing/server'))
} else if (!fs.existsSync(path.join(process.cwd(), '/.hsing/server'))) {
  fs.mkdirSync(path.join(process.cwd(), '/.hsing/server'))
}
const server = net.createServer(function (socket) {
  let fileloading = false
  let msg = {
    type: 'connect',
    content: `success_connect: ${socket.remoteAddress} : ${socket.remotePort}`
  }

  socket.write(JSON.stringify(msg))

  socket.on('data', function (data) {
    if (fileloading) {
      return
    }

    let msg = JSON.parse(data)
    if (msg) {
      switch (msg.type) {
        case 'normal':
          logger('client:' + msg.content)

          break
        case 'login':
          if (login({
            username: msg.username,
            password: msg.password,
            socket: socket
          })) {
            socket.write(setMsg('登陆成功'))
          } else {
            socket.write(setMsg('登陆失败'))
            logger('登陆验证失败')
            socket.destroy()
          }
          break
        case 'file':
                    // fileget = true
          logger('fileupload')
          socket.write(setMsg('success'))
          let fget = fs.createWriteStream(path.join(connectMap[getSocketId(socket)].filePath, './tmp.zip'))
          connectMap[getSocketId(socket)].file = true
          fget.on('finish', function (err) {
            fileloading = false
            logger('文件上传结束')
            let socketid = getSocketId(socket)
            if (zipUtil.unzip(path.join(connectMap[getSocketId(socket)].filePath, './tmp.zip'), path.join(connectMap[getSocketId(socket)].filePath, '/src'))) {
              logger('文件解压结束')

              const exec = require('child_process').execSync
              exec('node ../../../../node_modules/hsing/bin/hsing-build', {
                cwd: path.join(connectMap[getSocketId(socket)].filePath, '/src'),
                encoding: 'utf8'
              }, (error, stdout, stderr) => {
                if (error) {
                  console.log(error)
                }
                console.log(`stdout: ${stdout}`)
                console.log(`stderr: ${stderr}`)
              })
              logger('构建结束')
              connectMap[socketid].socket.write(setFile())
            }
          })
          fget.on('error', function (err) {
            logger(err)
          })

          fileloading = true
          socket.pipe(fget)

          break
        case 'sendfile':
          logger('发现文件上传请求')
          sendFile(socket)
          break
        case 'zip':
          break

        default:
          break
      }
    }
  })

  socket.on('close', function (hadError) {
    if (!hadError) {
      logger(`server closed success!  (${socket.remoteAddress}):(${socket.remotePort})`)
    } else {
      logger(`server closed error!  (${socket.remoteAddress}):(${socket.remotePort})`)
    }
    if (connectMap[getSocketId(socket)] && connectMap[getSocketId(socket)].file) {
      connectMap[getSocketId(socket)].file = false
    } else {
      connectMap[getSocketId(socket)] = null
    }
  })
  socket.on('error', function (err) {
    logger('!!!err!!!', err)
  })
  socket.on('end', function () {
    logger('end')
  })
})
server.listen({
  port: userConf.port
}, function () {
  logger(`服务器启动完成: ${JSON.stringify(server.address())}`)
})

// 获取socketid
function getSocketId (socket) {
  return `${socket.remoteAddress}`
}
// 登陆
function login (param) {
  logger(`login:${param.username}`)
  if (param.username && userConf.user[param.username] && param.password && (userConf.user[param.username] === param.password)) {
    if (connectMap[getSocketId(param.socket)]) {
      connectMap[getSocketId(param.socket)].login = true
      connectMap[getSocketId(param.socket)].socket = param.socket
    } else {
      connectMap[getSocketId(param.socket)] = {
        socket: param.socket,
        login: true
      }
    }

    if (!fs.existsSync(path.join(process.cwd(), './.hsing/server/' + getSocketId(param.socket)))) {
      fs.mkdirSync(path.join(process.cwd(), './.hsing/server/' + getSocketId(param.socket)))
    }
    connectMap[getSocketId(param.socket)].filePath = path.join(process.cwd(), './.hsing/server/' + getSocketId(param.socket))

    logger(`loginsuccess:${param.username}`)
    return true
  } else {
    return false
  }
}

// 普通消息
function setMsg (text) {
  return JSON.stringify({
    type: 'normal',
    content: text
  })
}

function setFile (text) {
  return JSON.stringify({
    type: 'file',
    content: 'fileover'
  })
}

function sendFile (socket) {
  new Promise(function (resolve) {
    zipUtil.packZip(path.join(connectMap[getSocketId(socket)].filePath, '/src/dist/'), path.join(connectMap[getSocketId(socket)].filePath, './tmp.zip'), resolve, '', 'serverdist')
  }).then(function () {
    var fileStream = fs.createReadStream(path.join(connectMap[getSocketId(socket)].filePath, './tmp.zip'))
    fileStream.on('end', function () {
      logger('服务器文件传输完成')
    })

    fileStream.pipe(socket)
  }).catch(function (e) {
    logger('e:' + e)
    socket.destroy()
  })
}

// function getfile(data) {

//     var writerStream = fs.createWriteStream('./test/flex1.zip');
//     let a = Buffer.concat(filedata).toString();
//     writerStream.write(a);
//     writerStream.end();
//     writerStream.on('finish', function() {
//         console.log("写入完成。");
//     });
//     writerStream.on('error', function(err) {
//         console.log(err.stack);
//     });
// }
