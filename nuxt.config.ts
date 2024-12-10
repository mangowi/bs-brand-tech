// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css', // Add Bootstrap CSS
  ],
  modules:[
    '@nuxt/image-edge'
  ],
  image:{
    domains:[
      "vm-images-test.global.ssl.fastly.net",
      "jj-images-test.global.ssl.fastly.net",
      "jx-images-test.global.ssl.fastly.net",
    ]
  }
})
