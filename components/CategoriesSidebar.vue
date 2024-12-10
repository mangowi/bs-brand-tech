<script lang="ts">
import { computed, ref } from "vue";
import { useProductStore } from "~/stores/productStore";
import { useShopStore } from "~/stores/shopStore";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "CategoriesSidebar",
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["categorySelected"],
  setup({ emit }) {
    const route = useRoute();

    // Store Access
    const shopStore = useShopStore();
    const productStore = useProductStore();

    // Reactive Properties
    const language = computed(() => shopStore.language); // Language from store
    const categories = computed(() => productStore.categories || []); // Categories from store

    // Get selected category
    const selectedCategory = computed(() => productStore.selectedCategory  || null);

    // State for open/closed categories
    const openCategories = ref<string[]>([]);

    // Toggle visibility for categories
    const toggleCategory = (category: any, hasSubcategories: boolean) => {
      try {
        if(category == null) return;  
        if (hasSubcategories) {
          let id = category.id;
          if (!id) {
            console.warn("Invalid category ID");
            return;
          }
          if (openCategories.value.includes(id)) {
            openCategories.value = openCategories.value.filter((openId) => openId !== id);
          } else {
            openCategories.value.push(id);
          }
        } else {
          productStore.setSelectedCategory(category);
          emit("categorySelected", category);

        }
      } catch (error) {
       
      }
     
    };

    // Flat categories for better rendering
    const flatCategories = computed(() => {
      const flattenCategories = (categoryList: any[], level = 0): any[] =>
        categoryList.reduce((acc, category) => {
          acc.push({ ...category, level });
          if (category.categories) {
            acc.push(...flattenCategories(category.categories, level + 1));
          }
          return acc;
        }, []);
      return flattenCategories(categories.value);
    });
      
    // Emit event on category selection
    const selectCategory = (category: any) => {
      if(category != null){
        productStore.setSelectedCategory(category); // Sync category in store
        emit("categorySelected", category);
      }
    };

    const isSidebarOpen = ref(false); // Sidebar visibility state
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
      // Get Text Item Based on the Language 
      const getItemLanguage = (text: string) => {
          return shopStore.getLanguageText(text);
        };

    // Check if the current route matches "product/:id"
    const isProductDetailPage = computed(() => {
      const pathMatch = route.path.match(/^\/product\/\d+$/);
      return Boolean(pathMatch);
    });
   
    return {
      toggleCategory,
      selectCategory,
      isSidebarOpen,
      toggleSidebar,
      openCategories,
      flatCategories,
      categories,
      language,
      selectedCategory,
      getItemLanguage,
      isProductDetailPage
    };
  },
});

</script>

<template>
  <div class="categories-sidebar" v-if="!isProductDetailPage">
   <!-- Gay Ribbon for toggling the sidebar -->
   <div class="ribbon" @click="toggleSidebar">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ribbon-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      :class="{ 'is-open': isSidebarOpen }"
    >
      <path
        d="M4 9l8 8 8-8"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="ribbon-text" v-if="selectedCategory == null">{{ getItemLanguage('Text.AllCategories') }}</span>
    <span class="ribbon-text" v-if="selectedCategory != null">  {{ selectedCategory.name[language] || selectedCategory.name.en }}</span>
  </div>
    <div class="sidebar-navigation" :class="{ 'is-open': isSidebarOpen }">
      <div
        v-for="category in flatCategories"
        :key="category.id"
        :class="[
          'category-item',
          `level-${category.level}`,
          { 'is-open': openCategories.includes(category.id) }
        ]"
      >
        <!-- Category Header -->
        <div class="category-header" @click="toggleCategory(category,category!= null && category.categories && category.categories.length > 0)">
          <span class="category-title"
          :class="{
            'is-active': selectedCategory?.id === category.id,
          }"
          >
            {{ category.name[language] || category.name.en }}
          </span>
          <svg
            v-if="category.categories"
            class="accordion-icon"
            :class="{ 'is-open': openCategories.includes(category.id) }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path
              d="M8.5 9.5l4 4 4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
  
        <!-- Subcategories -->
        <div
          v-if="category.categories"
          class="subcategories"
          :style="{ display: openCategories.includes(category.id) ? 'block' : 'none' }"
        >
          <a
            v-for="subCategory in category.categories"
            :key="subCategory.id"
            href="#"
            @click.prevent="selectCategory(subCategory)"
            class="subcategory-link"
            :class="{
              'is-active': selectedCategory?.id === subCategory.id,
            }"
          >
            {{ subCategory.name[language] || subCategory.name.en }}
          </a>
        </div>
      </div>
    </div>
  </div>
 
</template>

<style scoped>
.categories-sidebar {
  position: relative;
  background-color: #f8f9fa;
  position: relative;
  height: 50px;
}

.ribbon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #00030682;
  color: white;
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 1.0rem;
  text-decoration: none;
  font-size: 11px;
}

.ribbon-icon {
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.ribbon-icon.is-open {
  transform: rotate(180deg);
}

.ribbon-text {
  font-size: 12px;
}

.sidebar-navigation {
  padding: 1rem;
  display: none !important;
}

.sidebar-navigation.is-open {
  transition: max-height 0.3s ease;
  display: flex !important;
}

/* Main Categories Styles */
.sidebar-navigation {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 1rem;
  position: absolute;
  overflow: auto;
  z-index: 30;
}

.category-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.category-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.category-title {
  font-weight: 600;
}

.accordion-icon {
  transform: rotate(0deg);
  transition: transform 0.2s;
}

.accordion-icon.is-open {
  transform: rotate(90deg);
}

/* Subcategory Styles */
.subcategories {
  padding-left: 1rem;
  margin-top: 0.5rem;
}

.subcategory-link {
  display: block;
  text-decoration: none;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.subcategory-link:hover {
  text-decoration: underline;
  color: #007bff;
}

/* Dynamic Level Styling */
 .category-title {
  font-size: 0.9rem;
}
.subcategory-link.is-active, .category-title.is-active {
    color: #007bff !important;
    text-decoration: underline !important;
}

@media screen and (max-width: 480px) {
 
}

@media screen and (min-width: 481px) and (max-width: 768px) {

}

@media screen and (min-width: 768px) {

}
</style>
