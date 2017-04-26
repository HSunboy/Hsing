const pluginLoader = require('../baseLoader/pluginLoader')
const webpack = require('webpack')
const assert = require('assert')
    /**
     * 
     * 
     * @param {dic} options 
     * @param {dic} baseConf 
     */
module.exports = function(options, baseConf) {
    assert(baseConf, 'baseConf配置文件不得为空!')
    let commonsplugin = new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'wplib']
    })
    pluginLoader(commonsplugin, baseConf)
}