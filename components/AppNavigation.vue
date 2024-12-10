<template>
  <div class="fixed-header">
    <!-- Header -->
    <header class="border-bottom fixed-header">
      <div class="container">
        <!-- Language Selection -->
        <div class="language-selection d-flex align-items-center justify-content-end gap-3">
          <button
            class="btn btn-link p-0"
            :class="{ active: language === 'dk' }"
            @click="setLanguage('dk')"
          >
            <img src="/flags/denmark.svg" alt="Danish" class="flag-icon" />
          </button>
          <button
            class="btn btn-link p-0"
            :class="{ active: language === 'en' }"
            @click="setLanguage('en')"
          >
            <img src="/flags/english.svg" alt="English" class="flag-icon" />
          </button>
        </div>
        <div class="d-flex align-items-center justify-content-between py-3">
          <!-- Logo -->
          <nuxt-link to="/" class="navbar-brand fw-bold text-dark">{{ companyBrandName }}</nuxt-link>
 
          <!-- Navigation --> 
          <nav class="d-none d-md-flex gap-4">
            <div class="app-brand-navigation"
            :class="{ 'active-brand': currentBrand === null }">
              <nuxt-link to="/brand/" class="text-decoration-none text-dark app-navigation-brand">{{ getItemLanguage('Text.All') }}</nuxt-link>
            </div>
            <div class="app-brand-navigation"
              v-for="(brand, index) in brands" :key="index" :dataBrandName="brand"
              :class="{ 'active-brand': currentBrand === brand }"
              >
              <nuxt-link
                :to="'/brand/' + encodeURIComponent(brand)"
                class="text-decoration-none text-dark app-navigation-brand"
              >
                {{ brand }}
              </nuxt-link>
            </div>
          </nav>

          <!-- Search and Cart Icon -->
          <div class="d-flex align-items-center gap-3">
            <!-- Search -->
            <form class="d-flex" @submit.prevent>
              <input
                v-model="searchQuery"
                @input="onSearch"
                class="form-control form-control-sm me-2 br-0"
                type="search"
                :placeholder="getItemLanguage('Text.Search')"
                aria-label="Search"
              />
            </form>

            <!-- Cart Icon with Badge -->
          <div class="cart-icon-wrapper position-relative">
            <svg class="svg-inline--fa fa-cart-plus cart-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="" fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"></path></svg>
            <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
          </div>
          </div>
        </div>
      </div>
    </header>
    <RootCategoriesMenu/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useRoute } from 'vue-router';
import { useShopStore} from '~/stores/shopStore';
import RootCategoriesMenu from "~/components/RootCategoriesMenu.vue";
export default defineComponent({
  name: 'AppNavigation',
  components:{RootCategoriesMenu},
  setup() {
    const route = useRoute();
    const productStore = useProductStore();
    const shopStore = useShopStore();
    
    const shopBrands = computed(() => shopStore.shopBrands);
    const companyBrandName = computed(() => shopStore.companyBrandName);
    const language = computed(() => shopStore.language);

    // Get the current brand from the route
    const currentBrand = computed(() => {
      const brandName = route.params.name ? decodeURIComponent(route.params.name as string) : null;
      return brandName;
    });
    const searchQuery = ref('');

    const onSearch = () => {
      if (searchQuery.value.length >= 3) {
        productStore.filterProducts(searchQuery.value);
      }else if(searchQuery.value.length >= 0){
         productStore.filterProducts('');
      }
    };
     // Get Text Item Based on the Language 
     const getItemLanguage = (text: string) => {
          return shopStore.getLanguageText(text);
        };
    // Language setter
    const setLanguage = (lang: string) => {
          shopStore.setLanguage(lang);
        };

    // Cart items count
    const cartItemsCount = computed(() => productStore.cartItems.length);

    return {
      searchQuery,
      onSearch,
      brands: shopBrands,
      companyBrandName,
      language,
      currentBrand,
      setLanguage,
      getItemLanguage,
      cartItemsCount

    };
  }, 
});
</script>

<style scoped>
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
}

.app-navigation-brand {
  background-color: transparent;
  line-height: 1.5rem;
  font-weight: 800;
  display: inline-block;
  text-decoration: none;
  font-size: 12px;
  text-transform: uppercase;
  border: 0;
}
.app-brand-navigation-active{
  background-color: black;
}
.app-brand-navigation{
  padding: .5rem .7rem;
}
.language-selection {
  margin-bottom: 10px;
}

.flag-icon {
  width: 24px;
  height: 18px;
  border-radius: 0%;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease;
}

.flag-icon:hover {
  border-color: #007bff81;
}

button.active .flag-icon {
  border-color: #007bff;
}

button {
  background: none;
  border: none;
  outline: none;
}
.cart-icon-wrapper {
  position: relative;
  cursor: pointer;
}

.cart-icon {
  font-size: 1.5rem;
  color: #43464e;
}

.cart-icon:hover {
  color: #007bff;
}

.cart-badge {
  position: absolute;
  top: -17px;
  right: -10px;
  background-color: #dc3545;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
}
</style>