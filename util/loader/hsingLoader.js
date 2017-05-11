const vendorLoader = require('../baseLoader/vendorLoader.js')
const entryLoader = require('../baseLoader/entryLoader.js')
const sourceMapLoader = require('../baseLoader/sourceMapLoader.js')
const templateLoader = require('../baseLoader/templateLoader.js')

module.exports = function (options, baseConf) {
  return [vendorLoader, entryLoader, sourceMapLoader, templateLoader]
}
