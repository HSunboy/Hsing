const merge = require('webpack-merge')

const base_conf = require('./base_conf.js')
const wpparse = require('./parse.js')
const user_path = require('./user-path.js')
const parse = require('./parse.js')
const user_conf = require(user_path.pathOfConf)
let pconf = {};


pconf = merge(base_conf, parse(user_conf))

//添加插件
if (pconf.extends && pconf.extends.length > 0) {
    for (let item in user_conf) {

        require('hsing-plugin-' + pconf.extends[item])(pconf)
    }
}

module.exports = pconf;