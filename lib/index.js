// console.log("    _/    _/            _/                      ")
// console.log("   _/    _/    _/_/_/      _/_/_/      _/_/_/   ")
// console.log("  _/_/_/_/  _/_/      _/  _/    _/  _/    _/    ")
// console.log(" _/    _/      _/_/  _/  _/    _/  _/    _/     ")
// console.log("_/    _/  _/_/_/    _/  _/    _/    _/_/_/      ")
// console.log("                                       _/       ")
// console.log("                                  _/_/          ")
const hsing = require('../util/core/coreHsing')
const parse = require('../util/parse')
const webpackParse = require('../util/webpackParse')

module.exports = {
  core: {
    parse: parse,
    loader: {
      pluginLoader: require('../util/baseLoader/pluginLoader'),
      extendLoader: require('../util/baseLoader/extendLoader')
    },
    webpackParse: webpackParse
  },

  hsing: hsing
}
