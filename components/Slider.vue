<template>
    <div
      class="slider"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
        <nuxt-link :to="'/product/'+productId">
            <img :src="images[currentIndex]" :alt="productName" class="slider-image" />
        </nuxt-link>
      
  
      <!-- Left Arrow  using FontAwesome  -->
      <div
        class="arrow left"
        v-show="hover"
        @click="prevImage"
      >
      <FontAwesomeIcon :icon="['fas', 'arrow-left']" />

      </div>
  
      <!-- Right Arrow using FontAwesome -->
      <div
        class="arrow right"
        v-show="hover"
        @click="nextImage"
      >
      <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      },
      productId:{
        type:Number,
        required:true
      },
      productName:{
        type:String,
        required:false
      }
    },
    data() {
      return {
        currentIndex: 0,
        hover: false,
      };
    },
    methods: {
      nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prevImage() {
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
    },
  };
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    overflow: hidden;
    margin: 10px auto;
  }
  
  .slider-image {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensures the entire image is shown */
    display: block; /* Removes inline gaps for images */
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
  }
  
  .arrow.left {
    left: 10px;
  }
  
  .arrow.right {
    right: 10px;
  }
  
  .arrow:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  </style>
  