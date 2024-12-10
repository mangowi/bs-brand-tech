import { defineStore } from 'pinia';

import {Product,PromotionalSpot} from '../types.ts'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    selectedCategory: null, // Currently selected category
    products: [] as Product[],
    cartItems: [] as Product[],
    categories: []  as any[],
    originalProducts: [] as Product[],
    promotionalSpots: [] as PromotionalSpot[],
    originalPromotionalSpots: [] as PromotionalSpot[],
    filteredProducts: [] as Product[],
    searchQuery: '',
  }),
  actions: {
    setProducts(products: Product[]) {
      this.products = products;
      this.filteredProducts = products; // Initialize with all products

       // Initialize originalProducts only if it's empty
       if (this.originalProducts.length === 0) {
        this.originalProducts = [...products];
      }
    },
    setSetCartItemProducts(product: Product) {
      this.cartItems = [...this.cartItems, product]
    },
    setCategories(categories: any) {
      if(categories != null){
        const data = categories.categories
        if (this.categories.length === 0) {
          this.categories = [...data];
          console.log(`categories`, this.categories)
        }
      }
    },
    setPromotionalSpots(spots: PromotionalSpot[]) {
      this.promotionalSpots = spots;
       // Initialize originalPromotionalSpots only if it's empty
       if (this.originalPromotionalSpots.length === 0) {
        this.originalPromotionalSpots = [...spots];
      }
    },
    filterProducts(query: string) {
      this.searchQuery = query;
      const lowerQuery = query.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          (product.name?.dk?.toLowerCase().includes(lowerQuery) || false) ||
          (product.name?.en?.toLowerCase().includes(lowerQuery) || false)
      );
    },
    getShopNormalProducts(){
      return this.originalProducts;
    },
    resetProductsAndPromotions(resetCategory:boolean = false) {
      this.products = [...this.originalProducts]; // Reset products to original
      this.promotionalSpots = [...this.originalPromotionalSpots]; // Reset promotions to original
      this.filteredProducts = [...this.originalProducts]; // Reset filtered products to original
    
    },
    setSelectedCategory(category) {
      this.selectedCategory = category;
    },
  },
});
