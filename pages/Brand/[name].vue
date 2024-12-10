<template>
  <div>
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '~/stores/productStore';
import ProductList from '@/components/ProductList.vue';

export default defineComponent({
  name: 'brand',
  components: {
    ProductList,
  },
  setup() {
    const route = useRoute(); // Get route parameters
    const productStore = useProductStore();
    const brandName = decodeURIComponent(route.params.name as string);

     // Method to update store for the selected brand
    const updateStoreForBrand = () => {
     
      if (!brandName) {
        // Reset both products and promo spots if no brand is selected
        productStore.resetProductsAndPromotions();
        return;
      }
     
      // Filter products and promo spots by the brand
      const filteredProducts = productStore.originalProducts.filter(
        (product : any) => product.brand === brandName
      );

      const filteredPromotions = productStore.originalPromotionalSpots.filter(
        (promo :any) => promo.position 
      );

      // Update store with filtered lists
      productStore.setProducts(filteredProducts);
      productStore.setPromotionalSpots(filteredPromotions);
    };

    // Watch for route changes and re-run filtering logic
    watch(
      () => route.params.name,
      () => {
        updateStoreForBrand();
      },
      { immediate: true } // Trigger on initial load
    );

    return {brandName};
  },
});
</script>
