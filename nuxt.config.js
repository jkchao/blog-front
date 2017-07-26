module.exports = {
  // cache: true,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  build: {
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: ['axios'],
    // postcss
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
    ],
    // babel
    babel: {
      presets: ['es2015', 'stage-2']
    }
  },
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'blog' },
      { hid: 'keywords', name: 'keywords', content: '三毛，前端开发，JavaScript, Node' },
      { name: 'author', content: 'jkchaom@gmail.com' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
