const path = require('path')

const assert = require('assert')
const loaderDispatch = require('./loaderDispatch')

module.exports = function(Hsing, callback) {
    new Promise(function(resolve, reject) {
        if (Hsing.beforeParse) {
            Hsing.beforeParse(resolve, Hsing.baseConf, Hsing.options)
        } else {
            resolve()
        }
    }).then(function() {
        return new Promise(function(resolve, reject) {
            loaderDispatch(Hsing.loaders, Hsing.baseConf, Hsing.options)
            resolve()
        })
    }).then(function() {
        return new Promise(function(resolve, reject) {
            if (Hsing.afterParse) {
                Hsing.afterParse(resolve, Hsing.baseConf, Hsing.options)
            } else {
                resolve()
            }
        })
    }).catch(function(e) {
        console.log(e)
        process.exit(-1)
    }).then(function() {
        callback(Hsing.baseConf)
    });
}