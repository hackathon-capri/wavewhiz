<script setup>
import CartComponent from '@/components/CartComponent.vue';
import ProductsListing from '@/components/ProductsListing.vue';

import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
const productsStore = useProductsStore();
const cartStore = useCartStore();
</script>

<template>
  <cart-component
    v-if="cartStore.showCart"
    :cart="cartStore.cart"
    @hide-cart="cartStore.showCart = false"
    @increment-product="cartStore.incrementProductsToCart"
    @decrement-product="cartStore.decrementProductToCart"
  />
  <template v-else>
    <products-listing
      :products="productsStore.books"
      @add-to-cart="cartStore.addToCart"
    />
  </template>
</template>
