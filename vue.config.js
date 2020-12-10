const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'music',
  lintOnSave: isProd,
  productionSourceMap: true,
  configureWebpack: {
    devtool: isProd ? false : 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variables.scss";
          @import "~@/assets/styles/mixin.scss";
        `,
      },
    },
  },
}
