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
  name: 'IndexPage',
  components: {
    ProductList
  },  
  setup() {
    const productStore = useProductStore();
      productStore.resetProductsAndPromotions(true);
      return {};
  },
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }
}
</style>