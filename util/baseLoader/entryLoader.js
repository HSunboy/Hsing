module.exports = {
  loaderName: 'entry',
    /**
     * 入口加载
     *
     * @param {dic} options
     * @param {dic} baseConf
     * @returns
     */
  loaderFunc: (options, baseConf) => {
    if (!options) {
      return
    }
    if (baseConf.entry) {
      baseConf.entry.main = options
    } else {
      baseConf.entry = {
        main: options
      }
    }
  }
}
