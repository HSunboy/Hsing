const chalk = require('chalk')
const baselog = require('./log/logger.js')
const _ = require('lodash')
const logconf = require('./log/wp-base-log.js')
var hslog = {}
    // true，版本，用时，warning
    //  version: true,
    // time: true,
    // warning: true,
    // beforeFileMsg: true,
    // afterFileMsg: true,
    // hash: false,
    // error: true
hslog.wplog = (option, msg, warning) => {
  if (!msg) {
    baselog.fatal('不存在msg！')
  }
  option = _.extend(logconf, option)
  if (option.version) {
    baselog.log(`版本：${msg.version}`)
  }
  if (option.time) {
    baselog.log(`时间：${msg.time}ms`)
  }
  if (option.hash) {
    baselog.log(`构建哈希：${msg.hash}`)
  }
  if (option.fileMsg) {
    baselog.log('文件信息:')
    let chunk = []
    for (let item in msg.assetsByChunkName) {
      chunk.push(...msg.assetsByChunkName[item])
    }
    console.log(`${chalk.blue.bold.bgWhite('主文件：')}`)
    for (let item in msg.assets) {
      if (chunk.indexOf(msg.assets[item].name) !== -1) {
        console.log(`${chalk.blue('文件名：')}${msg.assets[item].name} * 大小：${msg.assets[item].size} B`)
      }
    }
    console.log(`${chalk.blue.bold.bgWhite('其它文件：')}`)
    for (let item in msg.assets) {
      if (chunk.indexOf(msg.assets[item].name) !== -1) {
        continue
      }
      console.log(`${chalk.blue('文件名：')}${msg.assets[item].name} * 大小：${msg.assets[item].size} B`)
    }
  }
  if (warning) {
    console.log(`${chalk.yellow.bold('提示：')}${chalk.yellow(msg.warnings)}`)
  }
}
_.extend(hslog, baselog)

module.exports = hslog
