<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Search from "./components/Search.vue";
import Product from "./components/Product.vue";
import {store} from "./store.js";

</script>

<template>
  <main class="flex flex-col items-center w-screen h-screen bg-base-200">
    <Navbar />
    <div class="flex mt-24 w-full">
      <Search v-if="store.productview" />
      <Product v-else />
    </div>
    <Footer />
  </main>
</template>
