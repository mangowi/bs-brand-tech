<template>
  <div class="container-fluid p-0">
    <NuxtLayout>
    </NuxtLayout>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useShopStore } from '~/stores/shopStore';

import data from '~/assets/data.json';
import languages from '~/assets/languages.json';

const brands = [...new Set(data.products.map((product) => product.brand))];
const companyBrandName = data.companyBrandName;

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const shopStore = useShopStore();
    onMounted(() => { 
      productStore.setProducts(data.products); // Load products
      productStore.setPromotionalSpots(data.promotionalSpots); // Load promotional spots
      productStore.setCategories(data.categories); // Load Categories 
      shopStore.setCompanyBrandName(companyBrandName); // Load shop name
      shopStore.setShopBrands(brands); // Load product brands
      shopStore.setLanguageText(languages.languageTexts); // Load language text

    });
  },
});
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    .product-name {
      font-size: .786rem;
      text-transform: uppercase;
      line-height: normal !important;
        padding-top: .31rem;
        padding-bottom: .31rem;
        padding-right: .25rem;
        display: grid;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        grid-area: title;
    }
    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .active-brand {
      background-color: #000306;
      color: white;
      font-weight: bold;
    }
    .active-brand a{
      color: white !important;
      font-weight: bold;
    }
    .app-brand-navigation:not(.active-brand):hover {
      background-color: #e3e7ea;
    }
    .text-no-transform{
      text-transform: none !important;
    }
  </style>