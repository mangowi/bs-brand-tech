<template>
  <div>
    Product Details Page
  </div>
</template>

<script lang="ts">
import data from '~/assets/data.json'; 
import ProductList from "@/components/ProductList.vue";
const {products} = data;

export default {
  name: 'productPage',
  data() {
    return{
      products
    }
  },
  components:{
    ProductList
  }
}
   
</script>

<style>

</style>