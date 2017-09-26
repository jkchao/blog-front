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
      'particles.js',
      'swiper',
      'marked',
      'gravatar',
      'highlight.js'
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
    title: '民谣、读书、码农',
    titleTemplate: '%s | 三毛',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '民谣，读书，码农。' },
      { hid: 'keywords', name: 'keywords', content: '前端开发，JavaScript, Node, Vue，nuxt' },
      { name: 'author', content: 'jkchaom@gmail.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // script: [
    //   {
    //     async: 'async',
    //     type: 'text/javascript',
    //     src: '//jkchao.disqus.com/count.js',
    //     id: 'dsq-count-scr'
    //   }
    // ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  // plugins
  plugins: [
    { src: '~plugins/marked.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/gravatar.js' },
    { src: '~plugins/swiper.js', ssr: false },
    { src: '~plugins/clickOutside.js', ssr: false },
    { src: '~/plugins/ga.js', ssr: false },
    { src: '~plugins/filter.js' },
    { src: '~plugins/finally.js' }
  ],

  // router
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },
  /*
  ** Global CSS
  */
  css: [
    'swiper/dist/css/swiper.css',
    { src: '~assets/scss/index.scss', lang: 'scss' },
    'highlight.js/styles/atom-one-dark.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#24292e' }
}
