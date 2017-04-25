const adm_zip = require('adm-zip')
const archive = archiver('zip')
const shell = require('shelljs')
const fs = require('fs')
module.exports = {
    unzip: function(file, output) {
        var unzip = new adm_zip(file)
        unzip.extractAllTo(output, true)
        return true
    },
    packZip: function(file, output, resolve, otherFile, othername) {
        const archiver = require('archiver')
        if (fs.existsSync(output)) {
            shell.rm('-rf', output)
        }

        var outStream = fs.createWriteStream(output)
        var filename = 'src';

        archive.on('error', function(err) {
            console.log('打包出错- - -|' + err)

            process.exit(-1)
        });
        outStream.on('close', function() {
            console.log(archive.pointer() + ' total bytes---压缩完成')
            resolve()

        })

        if (othername && othername.trim()) {
            filename = othername
        }

        archive.pipe(outStream)
        if (otherFile) {
            archive.file(otherFile, { name: 'hsing.conf.js' });
        }
        archive.directory(file, filename)

        archive.finalize()


    }
}