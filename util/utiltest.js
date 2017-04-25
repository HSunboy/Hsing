// const test = require('./logger.js')
const webpack = require('webpack')
const merge = require('./merge.js')
const chalk = require('chalk')
const user_path = require('./user-path.js')


const hsing = webpack(merge);


hsing.run(function(err, stats) {
    // console.log(stats.toJson());
    const sjson = stats.toJson();
    const chunk = [];
    // console.log(sjson.assetsByChunkName);

    if (stats.hasErrors()) {
        console.log(`错误信息：\n${sjson.errors}\n     *****************************\n`)
        process.exit(-1)
    }
    // console.log("构建信息:\n" + stats.toString({
    //     colors: true
    // }) + "\n ***********************")
    console.log(`版本信息（webpack）：${sjson.version}`)
    console.log(`用时（webpack）：${sjson.time}ms`)
        // console.log(`${JSON.stringify(sjson.assetsByChunkName)}`)

    for (let item in sjson.assetsByChunkName) {

        chunk.push(...sjson.assetsByChunkName[item]);
    }
    console.log(`${chalk.blue.bold.bgWhite("主文件：")}`)
    for (let item in sjson.assets) {
        if (chunk.indexOf(sjson.assets[item].name) != -1) {
            console.log(`${chalk.blue("文件名：")}${sjson.assets[item].name} * 大小：${sjson.assets[item].size} B`);
        }

    }
    console.log(`${chalk.blue.bold.bgWhite("其它文件：")}`)
    for (let item in sjson.assets) {
        if (chunk.indexOf(sjson.assets[item].name) != -1) {
            continue;
        }
        console.log(`${chalk.blue("文件名：")}${sjson.assets[item].name} * 大小：${sjson.assets[item].size} B`);
    }



})