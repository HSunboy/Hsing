module.exports = {
    loaderName: 'vendor',
    /**
     * 
     * 
     * @param {dic} options 
     * @param {dic} baseConf 
     * @returns 
     */
    loaderFunc: (options, baseConf) => {
        if (!options || options.length < 1) {
            return;
        }
        //copy Arr
        var tmp = options.slice()

        if (baseConf.entry) {
            baseConf.entry.vendor = tmp
        } else {
            baseConf.entry = {
                vendor: tmp
            }
        }
        return;
    }
}