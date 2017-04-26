const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const pluginLoader = require('./pluginLoader')
module.exports = {
    loaderName: 'template',
    /**
     * 
     * 
     * @param {dic} options 
     * @param {dic} baseConf 
     * @returns 
     */
    loaderFunc: (options, baseConf) => {
        if (!options) {
            return;
        }

        let htmlplugin = new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), options)
        })
        pluginLoader(htmlplugin, baseConf)


    }
}