<template>
    <div>
        <footer class="bg-dark text-light pt-5">
            <div class="container">
              <div class="row">
                <!-- Navigation Links -->
                <div class="col-md-3 mb-4">
                  <h5 class="fw-bold text-uppercase">{{ getItemLanguage(`Text.Shop`) }}</h5>
                  <ul class="list-unstyled">
                    <li  v-for="(brand,index) in brands"   :key="index">
                      <nuxt-link 
                      :to="'/brand/' + encodeURIComponent(brand)" 
                      class="text-light text-decoration-none">
                      {{ brand }}
                    </nuxt-link>
                  </li>
                  </ul>
                </div>
          
                <!-- Customer Service Links -->
                <div class="col-md-3 mb-4">
                  <h5 class="fw-bold text-uppercase">{{ getItemLanguage(`Text.CustomerService`) }}</h5>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.ContactUs`) }}</a></li>
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.Shipping`) }}</a></li>
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.Returns`) }}</a></li>
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.FAQs`) }}</a></li>
                  </ul>
                </div>
          
                <!-- About Links -->
                <div class="col-md-3 mb-4">
                  <h5 class="fw-bold text-uppercase">{{ getItemLanguage(`Text.About`) }}</h5>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.OurStory`) }}</a></li>
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.Careers`) }}</a></li>
                    <li><a href="#" class="text-light text-decoration-none">{{ getItemLanguage(`Text.Sustainability`) }}</a></li>
                  </ul>
                </div>
          
                <!-- Newsletter Subscription -->
                <div class="col-md-3 mb-4">
                  <h5 class="fw-bold text-uppercase">{{ getItemLanguage(`Text.Newsletter`) }}</h5>
                  <p>{{ getItemLanguage(`Text.SignUpForOffers`) }}</p>
                  <form>
                    <div class="mb-3">
                      <input type="email" class="form-control form-control-sm" :placeholder="getItemLanguage(`Text.EnterYourEmail`)">
                    </div>
                    <button class="btn btn-light btn-sm w-100" type="submit">{{ getItemLanguage(`Text.Subscribe`) }}</button>
                  </form>
                </div>
              </div> 
          
              <!-- Social Media Links -->
              <div class="row border-top pt-3">
                <div class="col-md-6 mb-2">
                  <p class="mb-0">&copy; {{ currentYear }} {{companyBrandName}} . {{ getItemLanguage(`Text.AllRightsReserved`) }}</p>
                </div>
                <div class="col-md-6 mb-2 text-md-end">
                  <a href="#" class="text-light me-3"><i class="bi bi-facebook"></i></a>
                  <a href="#" class="text-light me-3"><i class="bi bi-instagram"></i></a>
                  <a href="#" class="text-light me-3"><i class="bi bi-twitter"></i></a>
                  <a href="#" class="text-light"><i class="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>
          </footer>
          
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useShopStore} from '~/stores/shopStore';

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const shopStore = useShopStore();
    const shopBrands = computed(() => shopStore.shopBrands);
    const companyBrandName = computed(() => shopStore.companyBrandName);
    
    // Get Text Item Based on the Language 
    const getItemLanguage = (text: string) => {
          return shopStore.getLanguageText(text);
    };
    return {
      companyBrandName: companyBrandName,
      brands: shopBrands,
      currentYear: new Date().getFullYear(),
      getItemLanguage
    };
  },
});
</script>
