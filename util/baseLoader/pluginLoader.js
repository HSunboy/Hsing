/**
 * webpack插件插入
 * 
 * @param {webpackPlugin} plugin 
 * @param {dic} baseConf 
 * @returns 
 */
module.exports = function(plugin, baseConf) {
    if (!plugin) {
        return;
    }
    if (baseConf.plugins) {
        baseConf.plugins.push(plugin)
    } else {
        baseConf.plugins = [plugin]
    }
}