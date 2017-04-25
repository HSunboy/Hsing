'use strict'

module.exports = name => {
  try {
    require.resolve(name)

    return true
  } catch (_) {
    return false
  }
}
