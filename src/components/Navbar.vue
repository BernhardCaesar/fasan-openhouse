<script setup>
import { ref, onMounted } from 'vue'
import logo from '../images/FASANLogo.png'

const state = ref({
  qualityC: false,
})

onMounted(() => {
  state.value.qualityC = true;
})

</script>

<template>
  <div class="navbar absolute inset-x-0 top-0 bg-base-100 flex justify-between">
    <div>
      <div class="avatar mx-1 ml-4">
        <div class="w-11 rounded">
          <img :src="logo" alt="FASAN Logo" />
        </div>
      </div>
      <div class="flex flex-col justify-around">
        <h1 class="btn btn-ghost base text-base-content text-xl -mt-2">FASAN @ LIT FACTORY</h1>
      </div>
    </div>
    <div class="mr-8">
      <span v-if="state.basyx" class="badge badge-error badge-lg">Quality Server not connected</span>
      <span v-else class="badge badge-primary badge-outline badge-lg">Quality Server connected</span>
    </div>
  </div>
</template>