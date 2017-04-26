const assert = require('assert')

module.exports = function(loaders, baseConf, options) {
    assert(baseConf, 'baseConf不得为空!')
    assert(options, 'options配置属性不得为空!')
    for (let i of loaders) {
        if (i && i.loaderName) {
            i.loaderFunc(options[i.loaderName], baseConf)
        }
    }

}