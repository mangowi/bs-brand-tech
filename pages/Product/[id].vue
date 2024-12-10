<template>
  <div class="container my-5">
    <div class="grid-wrap-product">
      <div class="row" v-if="product">
        <!-- Product Images -->
        <div class="col-md-6">
          <Slider :images="product?.images || []" :productId="(product as Product).id" />
        </div>
  
        <!-- Product Info -->
        <div class="col-md-6">
          <h1 class="h3">
            <span v-if="getProductName(product as Product)" class="product-name">
              {{ getProductName(product as Product) }}
            </span>
          </h1>
          <h4 class="brand" :style="['fontSize: 10']">{{ product.brand }}</h4>
          <p class="text-muted">{{ product?.description || "" }}</p>
          <p class="h4 text-secondary">{{ formatPrice(product?.price || 0) }}</p>
          <p v-if="product.stock" class="stock">{{ getItemLanguage("Text.Stock") }}: {{ product.stock }}</p>
          <p v-else class="text-danger">{{ getItemLanguage("Text.OutOfStock") }}</p>
  
          <!-- Sizes -->
          <div v-if="product?.size && product.size.length > 0" class="mt-3">
            <h5>{{ getItemLanguage("Text.AvailableSizes") }}</h5>
            <div class="sizes d-flex flex-wrap">
              <span
                v-for="(size, index) in product.size"
                :key="index"
                class="badge bg-secondary me-2"
              >
                {{ size }}
              </span>
            </div>
          </div>
  
          <!-- Add to Cart -->
          <div class="mt-4">
            <button
              class="btn btn-success btn-lg w-100"
              :disabled="!product"
              :style="['borderRadius: 0']"
              @click="addToCart(product)"
            >
            <svg class="svg-inline--fa fa-cart-plus add-cart-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="" fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"></path></svg>
             {{ getItemLanguage("Text.AddToCart") }}
            </button>
          </div>
          <div class="row">
              <div class="d-flex flex-column  d-flex flex-wrap">
                
          <!-- Variants -->
          <div v-if="product.variant && product.variant.length > 0" class="mt-3">
            <h5>{{ getItemLanguage("Text.Variants") }}</h5>
            <div class="variants"  v-for="(variant, index) in product.variant" :key="index">
              <p v-if="variant.stock" ><strong>{{ getItemLanguage("Text.Stock") }}:</strong> {{ product.stock }}</p>
              <p v-else class="tex-danger">{{ getItemLanguage("Text.OutOfStock") }}</p>
                <p><strong>{{ getItemLanguage("Text.Color") }}:</strong> {{ variant.color }}</p>
                <p><strong>{{ getItemLanguage("Text.Sizes") }}:</strong> {{ variant.size.join(", ") }}</p>
                <div class="variant-images d-flex flex-wrap mt-2">
                  <div
                    v-for="(img, imgIndex) in variant.images"
                    :key="imgIndex"
                    class="variant-image-wrapper me-2 mb-2"
                  >
                    <object class="product-img" :data="img" type="image/jpeg">
                      <nuxt-img
                      src="/images/default-image.png"
                      fit="cover"
                      format="webp"
                      quality="90"
                      position="top"
                      class="default-image"
                    />
                    </object>
                  </div>
                </div>
            </div>
            
          </div>
  
  
              </div>
          </div>
        </div>
      </div>
      <div v-else>
         <div class="col-6 ml-auto">
           {{ getItemLanguage("Text.NotFound") }}
         </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import Slider from "@/components/Slider.vue";
import { useProductStore } from "~/stores/productStore";
import { useShopStore } from "~/stores/shopStore";


export default defineComponent({
  name: "ProductDetailPage",
  head() {
    return {
      title: 'Product Details  - Brand Tech',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Brand Tech product details'
        },
        {
          name: 'keywords',
          content: 'best-seller, vue 3, nuxt 3'
        }
      ]
    };
  },
  components: {
    Slider,
  },
  setup() {
    const route = useRoute();
    const productStore = useProductStore();
    const shopStore = useShopStore();

    // Retrieving the product ID from the route
    const productId = route.params.id;

    // Find the product in the store
    const product = computed(() =>
      productStore.products.find((prod) => prod.id === Number(productId))
    );
  
    // Add to cart
    const addToCart = (product) => {
      productStore.setSetCartItemProducts(product);
    };

    // Format price utility
    const formatPrice = (price) => `${price.toFixed(2)} KR`;

    // Get the product name based on the language
    const getProductName = (product: any) => {
      const lang = shopStore.language;
      return product.name[lang] || product.name.dk || '';
    };
    // Get Text Item Based on the Language 
    const getItemLanguage = (text: string) => {
              return shopStore.getLanguageText(text);
    };
    return {
      product,
      formatPrice,
      addToCart,
      getProductName,
      getItemLanguage
      
    };
  },
});
</script>

<style scoped>
.grid-wrap-product {
  margin: 0 auto;
  display: grid;
  -webkit-column-gap: 10px;
  column-gap: 10px;
}
.active {
  background-color: #007bff !important;
  color: white;
}
.categories-sidebar,.categories-menu{
  display: none !important;
}

.variants button {
  transition: all 0.3s ease-in-out;
}

.active-variant {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.variant-details {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
}

.variant-images .variant-image-wrapper {
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.variant-images img,
.variant-images object {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (min-width: 768px) {
  .grid-wrap-product {
    max-width: 960px;
  }
}
</style>
