const webpack = require('webpack')
const hslog = require('../util/hslog.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = function (conf) {
  conf.plugins.push(new ProgressBarPlugin())
  const hsing = webpack(conf)
  hsing.run(function (err, stats) {
    if (err) {
      hslog.error(err)
    }
        // console.log(stats.toJson());
    const sjson = stats.toJson()
        // console.log(sjson.assetsByChunkName);

    if (stats.hasErrors()) {
      hslog.fatal(`错误信息:${sjson.errors}`)
    }

    hslog.wplog({}, sjson, stats.hasWarnings())
  })
}
