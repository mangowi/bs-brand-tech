<template>
    <div>
      <ProductList />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useProductStore } from '~/stores/productStore';
  import ProductList from '@/components/ProductList.vue';
  
  export default defineComponent({
    name: 'brandIndexPage',
    components: {
      ProductList,
    },
    setup() {
      const productStore = useProductStore();
      productStore.resetProductsAndPromotions();
      return {};
    },
  });
  </script>
  