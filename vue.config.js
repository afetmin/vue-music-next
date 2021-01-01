const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'music',
  publicPath:'./',
  lintOnSave: isProd,
  productionSourceMap: true,
  configureWebpack: {
    devtool: isProd ? false : 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
        'cpnts': resolve('src/components'),
        'common': resolve('src/components/common')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/index.scss";
        `,
      },
    },
  },
}
