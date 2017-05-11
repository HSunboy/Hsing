/**
 * 插件加载
 *
 * @param {any} options
 * @param {any} baseConf
 */
module.exports = function (options, baseConf) {
  if (options && options.length > 0) {
    for (let item of options) {
      require('hsing-plugin-' + item)(baseConf)
    }
  }
}
