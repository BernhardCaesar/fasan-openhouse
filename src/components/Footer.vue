<script setup>
  import litlogo from '../images/litlogo.webp'
</script>

<template>
  <footer class="footer w-screen absolute inset-x-0 bottom-0 p-3 bg-base-100 text-neutral-content">
    <aside class="flex flex-row w-full justify-between items-center">
      <img :src="litlogo" alt="LIT Factory Logo" class="h-12">
      <div class="flex flex-col mr-16">
        <p class="font-bold text-gray-800">Factory Asset, Sustainability & Analytics Nexus</p>
        <p class="italic text-gray-500">Putting the "lit" in LIT Factory.</p>
      </div>
    </aside>
  </footer>
</template>
