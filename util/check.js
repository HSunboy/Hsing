'use strict'

const path = require('path')
const fs = require('fs')
const updateNotifier = require('update-notifier')
const shelljs = require('shelljs')
const pkg = require('../package.json')
const PLUGIN_PATH = process.cwd();




exports.checkPermission = function() { //创建删除临时文件夹来测试权限
    const tmpFile = path.join(PLUGIN_PATH, 'tmp')

    fs.writeFileSync(path.join(PLUGIN_PATH, 'tmp'))
    shelljs.rm(tmpFile)
}


exports.checkVersion = function() {
    var notifier = updateNotifier({ pkg })

    notifier.notify()
    if (notifier.update) {
        console.log(notifier.update)
    }
}


exports.pluginExists = function(name) {
    return fs.existsSync(path.join(PLUGIN_PATH, 'node_modules', name))
}


exports.localExists = function(name) {
    return fs.existsSync(path.join(CWD_PATH, 'node_modules', name))
}