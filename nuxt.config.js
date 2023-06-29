const env = require('dotenv').config();
export default {
  mode: 'universal',
  env: env.parsed,
  serverMiddleware: [
    '~/api/index.js'
  ],
  target: 'server',
  /*
  ** Headers of the page
  */
  head: {
    title: 'CMS Báo ngày online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://tuhaosuviet.tuoitre.vn/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Mulish:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap'
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css'
      // },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'red' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/ckeditor.js', mode: 'client' },
    {
      src: '~/plugins/uploadimg',
      mode: 'client'
    },
    {src:'~/plugins/select', mode: 'client' }
  ],

  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/device',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    ['nuxt-highlightjs', {
      style: 'obsidian'
    }]
  ],
  server: {
    port: 8000, // default: 3000
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '0'
  },
  /*
  ** Build configuration
  */
  build: { babel: { compact: true } }
}
