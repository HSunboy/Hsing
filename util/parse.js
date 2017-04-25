const path = require('path')
const lodash = require('lodash')
const load_plugin = require('./load-plugin.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function(conf) {

    let pconf = {};
    pconf.plugins = [];

    pconf.entry = {
        main: conf.entry
    }
    if (conf.vendor && conf.vendor.length > 0) {
        pconf.entry.vendor = conf.vendor
    }
    //souceMap
    if (conf.sourceMap) {
        pconf.devtool = "cheap-module-source-map"
    }
    //htmlwebpack配置
    if (conf.template && conf.template.trim()) {
        let htmlplugin = new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), conf.template)
        })
        pconf.plugins.push(htmlplugin)
    }
    //公共js
    let commonsplugin = new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'wplib']
    })

    pconf.plugins.push(commonsplugin)







    return pconf;
}