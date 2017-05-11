'use strict'

const format = require('util').format
const chalk = require('chalk')
const version = require('../../package.json').version
const prefix = `[hsing@${version}]`
const sep = chalk.gray('-')

// 正常输出
exports.log = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.cyan(prefix), sep, msg)
}

// 失败
exports.fatal = function (message) {
  exports.error(message)

  if (process.env.NODE_ENV === 'testing') {
    throw new Error('exit')
  } else {
    process.exit(1)
  }
}

// 异常错误
exports.error = function (message) {
  if (message instanceof Error) {
    message = message.message.trim()
  }

  const msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
}

// 提醒
exports.warn = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.yellow(prefix), sep, msg)
}

// 成功提示
exports.success = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.green(prefix), sep, msg)
}
