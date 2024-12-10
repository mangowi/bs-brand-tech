# BrandTech Shop - Task Assignment

**BrandTech Shop** project! This repository contains a fictional online shopping platform built as part of a task assignment. 

The platform showcases products, allows users to filter, view product details, manage a shopping cart, and proceed to checkout.

---

## Features
- **Brand Filtering**: Filter products by brand.
- **Product Listings**: Displays all products with promotional items.
- **Category Filtering**: Browse products based on categories.
- **Product Details Page**: View detailed product information, including variants and stock levels.
- **Shopping Cart**: Add products to a cart, view cart details, and proceed to checkout.
- **Dynamic Components**: Uses sliders for product images and menus for categories.
- **Dynamic Local Languages**: Toggle language between Danish or English.
---

## Technologies Used

The project leverages modern front-end technologies:

1. **Vue 3**: Core JavaScript framework for building the UI.
2. **Nuxt 3**: Framework for server-side rendering and static site generation.
3. **Pinia**: State management for efficient handling of data.
4. **Other Plugins**: 
   - FontAwesome for icons.
   - Bootstrap for styling and responsive design.

---

## Installation and Setup

Follow these steps to clone and run the project:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Project Structure

- **`components/`**: Contains reusable Vue components like `ProductList`.
- **`pages/`**: Nuxt pages for routing (`index.vue`, `product/[id].vue`,`brand/index.vue`,`brand/[name].vue`).
- **`stores/`**: Pinia stores for managing state (`productStore`, `shopStore`).
- **`assets/`**: Static assets like images,language, and data.

---

## Usage

1. **Browse Products**: View all products and promotional items on the homepage.
2. **Filter by Category or Brand**: Use the sidebar or menu to filter products.
3. **View Product Details**: Click on a product to see its detailed information, variants, and stock (`product with id 3, give better overview of variants`).
4. **Manage Cart**: Add products to the cart.

---

## Live on Vercel - [Brand-Tech](http://bs-brand.tech.vercel.app)
![image](https://github.com/user-attachments/assets/bf0e9e52-95e0-4796-8172-19abda19ca46)

---
## Contributions

This project is a task assignment.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Happy Coding! 😊
