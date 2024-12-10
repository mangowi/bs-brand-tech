<template>
  <div>
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useProductStore } from '~/stores/productStore';
import ProductList from '@/components/ProductList.vue';
import data from '~/assets/data.json'; // Import your category data

export default defineComponent({
  name: 'IndexPage',
  components: {
    ProductList
  },  
  emits: ["categorySelected"],
  setup() {
    const productStore = useProductStore();

  
      productStore.resetProductsAndPromotions(true);
      return {categories: data.categories,};
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