module.exports = {
  // cache: true,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  build: {
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios',
      'particles.js'
    ],
    // postcss
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')()
    ],
    // babel
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ]
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
      { hid: 'description', name: 'description', content: '民谣，读书，ma nong' },
      { hid: 'keywords', name: 'keywords', content: '三毛，前端开发，JavaScript, Node, Vue' },
      { name: 'author', content: 'jkchaom@gmail.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  // router
  router: {
    linkActiveClass: 'link-active'
    // scrollBehavior (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/reset.css',
    { src: '~assets/scss/index.scss', lang: 'scss' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#20A0FF' }
}
