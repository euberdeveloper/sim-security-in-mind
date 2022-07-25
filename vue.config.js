const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: `"${require('./package.json').version}"`
        }
      })
    ]
  },
  transpileDependencies: [
    'vuetify'
  ]
})
