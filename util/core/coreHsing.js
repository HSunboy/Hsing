const baseConf = require('../base_conf')
const USER_PATH = require('../user-path')
const hslog = require('../hslog')
const assert = require('assert')
const otherLoader = require('../loader/otherLoader')
const extendsLoader = require('../baseLoader/extendLoader')
const options = require(USER_PATH.pathOfConf)
const loaders = require('../loader/hsingLoader')()

let Hsing = {
    beforeParse(resolve, _baseConf, _options) {

        resolve()
    },
    afterParse(resolve, _baseConf, _options) {
        otherLoader(this.options, this.baseConf)
        extendsLoader(this.options.extends, this.baseConf)

        resolve()
    },
    options: options,
    baseConf: baseConf,
    loaders: loaders
};

module.exports = Hsing;