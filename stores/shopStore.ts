import { defineStore } from 'pinia';

export const useShopStore = defineStore('shopStore', {
  state: () => ({
    language: 'dk', // Default language
    companyBrandName: String,
    shopBrands: [] as String[],
    languageTexts: [] as any[],
    selectedBrand: String,

  }),
  actions: {
    setShopBrands(brands: String[]) {
      this.shopBrands = brands;
     
    },
    setCompanyBrandName(companyBrandName: string) {
      this.companyBrandName = companyBrandName;
    },
    setSelectedBrand(brand: string){
      this.selectedBrand = brand;
    },
    setLanguage(lang: string) {
      this.language = lang;
    },
    setLanguageText(texts: any[]) {
      this.languageTexts = texts;
    },
    getLanguageText(text:string){
      // Look up object containing the key 
      const textObject = this.languageTexts.find((item) => text in item);

      if (!textObject) {
        return text; // Return the original key if no translation is found
      }

      // Access the translation for the current language
      const translatedText = textObject[text]?.[this.language];

      if (!translatedText) {
        return text; 
      }

      return translatedText;
    },
    
  },
});
