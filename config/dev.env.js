var merge = require('webpack-merge')//合并数组和对象
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
