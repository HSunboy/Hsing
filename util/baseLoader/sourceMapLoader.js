module.exports = {
    loaderName: 'sourceMap',
    /**
     * sourceMap类型加载
     * 
     * @param {dic} options 
     * @param {dic} baseConf 
     * @returns 
     */
    loaderFunc: (options, baseConf) => {
        if (!options) {
            return;
        }

        if (typeof options === 'string') {
            baseConf.devtool = options
        } else {
            baseConf.devtool = 'cheap-module-source-map'
        }
    }
}