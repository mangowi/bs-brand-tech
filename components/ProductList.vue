<template>
  <div class="container my-2">
    <div class="grid-wrap row">
      <div
        class="product-item"
        v-for="(item, index) in productsWithPromotions"
        :key="index"
        :class="{
          'promo-item-1x1': item.type === 'promotion' && item.data.type === '1x1',
          'promo-item-2x1': item.type === 'promotion' && item.data.type === '2x1',
          'promo-item-2x2': item.type === 'promotion' && item.data.type === '2x2',
        }"
      >
        <!-- Normal Product -->
        <div v-if="item.type === 'product'">
          <nuxt-link v-if="!(item.data as Product).images" :to="'/product/' + (item.data as Product).id">
            <nuxt-img
              src="/images/default-image.png"
              fit="cover"
              format="webp"
              quality="90"
              position="top"
              class="default-image"
            />
          </nuxt-link>

          <Slider
            v-if="(item.data as Product).images && (item.data as Product).images.length > 0"
            :images="(item.data as Product).images"
            :productId="(item.data as Product).id"
            :productName="getProductName(item.data as Product)"
          />

          <div class="d-flex flex-column product-info-add-cart">
            <nuxt-link :to="'/product/' + (item.data as Product).id" class="w-70 ellipsis">
              <span v-if="getProductName(item.data as Product)" class="product-name">
                {{ getProductName(item.data as Product) }}
              </span>
            </nuxt-link>
            <!-- Add to cart using FontAwesome -->
            <div class="icon-add-cart" @click="addToCart(item.data as Product)">
              <svg class="svg-inline--fa fa-cart-plus add-cart-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="" fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"></path></svg>

            </div>
          </div>
          <span class="product-price">{{ priceFormat((item.data as Product).price) }}</span>
        </div>

        <!-- Promotional Product Spot -->
        <div v-if="item.type === 'promotion'" class="promo-card">
          <a :href="(item.data as PromotionalSpot).link">
            <img
              :src="(item.data as PromotionalSpot).image.imageUrl"
              :alt="(item.data as PromotionalSpot).image.alt || 'Promotional Spot'"
              class="promo-image"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useShopStore } from '~/stores/shopStore';
import Slider from './Slider.vue';

export default defineComponent({
  name: 'ProductList',
  components: {
    Slider,
  },
  setup() {
    const productStore = useProductStore();
    const shopStore = useShopStore();

    const productsWithPromotions = computed(() => {
  const products = productStore.selectedCategory!= null && productStore.selectedCategory.id
    ? productStore.filteredProducts.filter((product: any) =>
        product.categories.includes(productStore.selectedCategory.id)
      )
    : productStore.filteredProducts; // Listen to filtered products
  
  const promotionalSpots = [...productStore.promotionalSpots].sort(
    (a, b) => a.position - b.position
  );

  const enrichedList: Array<{ type: 'product' | 'promotion'; data: any }> = [];
  let productIndex = 0;

  // Combine products and promotional spots based on positions
  promotionalSpots.forEach((promo) => {
    while (productIndex < promo.position - 1 && productIndex < products.length) {
      enrichedList.push({ type: 'product', data: products[productIndex] });
      productIndex++;
    }
    enrichedList.push({ type: 'promotion', data: promo });
  });

  // Add remaining products if any
  while (productIndex < products.length) {
    enrichedList.push({ type: 'product', data: products[productIndex] });
    productIndex++;
  }

  return enrichedList;
});

    // Get the product name based on the language
    const getProductName = (product: any) => {
      const lang = shopStore.language;
      return product.name[lang] || product.name.dk || '';
    };

    // Add to cart handler
    const addToCart = (product: any) => {
      productStore.setSetCartItemProducts(product);
    };

    const priceFormat = (value: number): string => {
      if(value == undefined) return ``;
      return `${value.toFixed(2)} KR`;
    };

    return {
      productsWithPromotions,
      getProductName,
      addToCart,
      priceFormat,
    };
  },
});
</script>

  
  <style scoped>
  .grid {
    display: grid;
    grid-column-end: span 12;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    grid-template-columns: repeat(12, 1fr);
    margin: 20px 0;
  }
  .grid-wrap {
    margin: 0 auto;
    display: grid;
    -webkit-column-gap: 10px;
    column-gap: 10px;
  }
  .product-item {
    overflow: hidden;
  }
  .link:hover,
  a:hover {
    cursor: pointer;
    text-decoration: underline;
    color: #43464e;
  }
  .product-name a:hover,
  .product-item a {
    color: #000;
    text-decoration: none;
  }
  .product-info-add-cart{
    position: relative;
  }

  .icon-add-cart{
    width: 20%;
    position: absolute;
    right: 0;
  }
  .icon-add-cart svg{
    cursor: pointer;
  }
  .w-70 {
    width: 70%;
  }
  .product-price {
    padding-top: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.7rem;
  }
  .default-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .grid-wrap {
    display: grid;
    grid-template-columns: repeat(4, minmax(130px, 1fr));
    column-gap: 10px;
    row-gap: 15px;
  }
  
  .product-item {
    overflow: hidden;
  }
  
  /* Promo item styles for 1x1 */
  .promo-item-1x1 {
    grid-column: span 1; /* Occupies one column */
    grid-row: span 1; /* Occupies one row */
  }
  
  /* Promo item styles for 2x1 */
  .promo-item-2x1 {
    grid-column: span 2; /* Occupies two columns */
    grid-row: span 1; /* Occupies one row */
  }
  
  /* Promo item styles for 2x2 */
  .promo-item-2x2 {
    grid-column: span 2; /* Occupies two columns */
    grid-row: span 2; /* Occupies two rows */
  }
  
  .promo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Responsive Grid */
  @media screen and (max-width: 480px) {
    .grid-wrap {
      grid-template-columns: repeat(2, minmax(130px, 1fr));
    }
  }
  
  @media screen and (min-width: 481px) and (max-width: 768px) {
    .grid-wrap {
      grid-template-columns: repeat(3, minmax(130px, 1fr));
    }
  }
  
  @media screen and (min-width: 768px) {
    .grid-wrap {
      max-width: 960px;
    }
  }
 
  </style>
  