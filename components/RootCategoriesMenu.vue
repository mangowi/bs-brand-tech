<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useProductStore } from "~/stores/productStore";
import { useShopStore } from "~/stores/shopStore";

export default defineComponent({
  name: "RootCategoriesMenu",
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["categorySelected"],
  setup(props, { emit }) {
    const shopStore = useShopStore();
    const productStore = useProductStore();
    const categories = computed(() => productStore.categories || []); // Categories from store
    const selectedCategory = computed(() => productStore.selectedCategory ||null); 

    // Language selection
    const language = computed(() => shopStore.language);

    // Open categories state
    const openCategories = ref<string[]>([]);

    // Toggle category visibility
    const toggleCategory = (id: string) => {
      if (openCategories.value.includes(id)) {
        openCategories.value = openCategories.value.filter((openId) => openId !== id);
      } else {
        openCategories.value.push(id);
      }
    };
    // Get Text Item Based on the Language 
        const getItemLanguage = (text: string) => {
          return shopStore.getLanguageText(text);
        };
    // Handle category selection
    const selectCategory = (category: any) => {
      productStore.setSelectedCategory(category);
      emit("categorySelected", category);
    };

    return {
      toggleCategory,
      selectCategory,
      openCategories,
      categories,
      language,
      getItemLanguage,
      selectedCategory
    };
  },
});
</script>

<template>
  <div class="categories-menu d-flex flex-column align-items-center justify-content-center gap-1">
    <div class="text-no-transform"> {{ getItemLanguage('Text.Categories') }}</div>
    <div class="d-flex flex-row align-items-center justify-content-center gap-3">
        <span v-for="category in categories" :key="category.id" class="menu-item" @click="selectCategory(category)"
        
        :class="{
          'is-active': selectedCategory?.id === category.id,
        }">
            {{ category.name[language] || category.name.en || "Unknown" }}
       </span>
    </div>
   
  </div>
</template>

<style scoped>
.categories-menu {
  background-color: #f8f9fa;
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.0rem;
  text-decoration: none;
  font-size: 11px;
}
.categories-menu span {
    cursor: pointer;
}
.categories-menu span:hover {
    text-decoration: underline;
    transition: transform 0.2s ease-in-out;
}
.menu-item {
  margin-bottom: 0.5rem;
}

.menu-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.menu-category.is-open {
  color: #007bff;
}

.toggle-icon {
  transform: rotate(0deg);
  transition: transform 0.2s ease-in-out;
}

.toggle-icon.is-open {
  transform: rotate(90deg);
}

.submenu {
  padding-left: 1rem;
  margin-top: 0.5rem;
  border-left: 1px solid #ddd;
}

.submenu-item {
  margin-bottom: 0.5rem;
}

.submenu-link {
  text-decoration: none;
  color: #333;
}

.submenu-link:hover {
  text-decoration: underline;
  color: #007bff;
}
.menu-item.is-active{
  text-decoration: underline;
}
</style>
