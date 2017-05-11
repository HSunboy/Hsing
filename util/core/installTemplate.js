const path = require('path')
const exec = require('child_process').execSync
const fs = require('fs')
const hslog = require('../hslog.js')
module.exports = function (template) {
  const templatePath = template.templatePath
  if (fs.existsSync(path.join(templatePath, 'config.json'))) {
    if (process.platform === 'win32') {
      exec('XCOPY ' + path.join(templatePath, 'templates/*') + process.cwd() + ' /E')
    } else {
      exec('cp -R ' + path.join(templatePath, 'templates') + '/* ' + process.cwd())
    }
  } else {
    hslog.error(`无效的模版目录:${templatePath}`)
  }
}
