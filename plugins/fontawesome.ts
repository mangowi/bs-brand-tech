// plugins/fontawesome.js
import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faHome, faArrowLeft, faArrowRight, faCartPlus, faShoppingCart} from '@fortawesome/free-solid-svg-icons' // Import specific icons
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// Adding icons to the library
library.add(faUser, faHome, faGithub,faArrowLeft, faArrowRight, faCartPlus, faShoppingCart)
console.log('Font Awesome Library:', library)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
