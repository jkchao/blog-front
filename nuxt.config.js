// const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '码农，读书，民谣',
    titleTemplate: '%s | 三毛',
    meta: [{
      charset: 'utf-8'
    },
    {
      'http-equiv': 'cleartype',
      content: 'on'
    },
    {
      'http-equiv': 'Cache-Control'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no'
    },
    {
      hid: 'description',
      name: 'description',
      content: '民谣，读书，码农。'
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: '前端开发，JavaScript, Node, Vue，nuxt'
    },
    {
      name: 'author',
      content: 'jkchaom@gmail.com'
    }
    ],

    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [
    // {
    //   async: 'async',
    //   type: 'text/javascript',
    //   src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    // },
    // {
    //   type: 'text/javascript',
    //   innerHTML: `
    //     (adsbygoogle = window.adsbygoogle || []).push({
    //       google_ad_client: "ca-pub-8918100374180146",
    //       enable_page_level_ads: true
    //     });
    //   `
    // }
    ],
    noscript: [{
      innerHTML: 'This website requires JavaScript.'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#24292e'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: './assets/scss/index.scss',
    lang: 'sass'
  },
  'highlight.js/styles/github.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~/plugins/marked.js'
  },
  {
    src: '~/plugins/highlight.js'
  },
  {
    src: '~/plugins/gravatar.js'
  },
  {
    src: '~/plugins/clickOutside.js',
    ssr: false
  },
  // {
  //   src: '~/plugins/ga.js',
  //   ssr: false
  // },
  {
    src: '~/plugins/copy.js',
    ssr: false
  },
  {
    src: '~/plugins/baidu-seo-push.js',
    ssr: false
  },
  {
    src: '~/plugins/filter.js'
  },
  {
    src: '~/plugins/finally.js'
  }],
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
