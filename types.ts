export  interface Product {
    id: number;
    brand: string;
    price: number;
    stock: number | string;
    color: string;
    size: Array<string | number>;
    name: {
      dk: string;
      en: string;
    };
    images: string[];
    categories: string[];
  }
  
  export interface PromotionalSpot {
    link: string;
    position: number;
    type: '1x1' | '2x1' | '2x2'; 
    image: {
      aspectRatio: string;
      imageUrl: string;
      focalPoint: {
        x: number;
        y: number;
      };
      maxWidth: string;
      alt: string;
    };
    imageAltText: string;
    _alias: string;
  }
  