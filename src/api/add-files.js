'use strict'

const isNode = require('detect-node')
const addToDagNodesTransform = require('../add-to-dagnode-transform')

module.exports = (send) => {
  return function add (path, opts, cb) {
    if (typeof (opts) === 'function' && cb === undefined) {
      cb = opts
      opts = {}
    }

    if (!isNode) {
      return cb(new Error('Recursive uploads are not supported in the browser'))
    }

    if (typeof (path) !== 'string') {
      return cb(new Error('"path" must be a string'))
    }

    var sendWithTransform = send.withTransform(addToDagNodesTransform)

    return sendWithTransform('add', null, opts, path, cb)
  }
}
