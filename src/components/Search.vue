<script setup >
import { ref } from 'vue'
import {store} from "../store.js";
import {AasMetadata} from "../scripts/aasmetadata.ts";

const typed = ref("")
const search = ref("")


function handleTipping(e) {
  if (e.key !== "Enter") return

  if (store.products.includes(typed.value)) {
    const meta = new AasMetadata()
    meta.updateSubmodelProperties("Nameplate", [{ type: "Property", idShort: "SerialNumber", iri: "", value: typed, unit: "" }])
    store.meta = meta
    store.selectedCube = typed.value
    store.productview = true
  }
  else {
    console.log("Fire!")
    setTimeout(() => {
      document.getElementById("errorDialog").showModal()
    }, 0)
  }
}

</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h1 class="text-primary-content font-extralight text-6xl my-6">Search for Product Pass</h1>
    <input
        type="text"
        placeholder="Search here"
        class="input input-bordered w-1/2 mt-6"
        v-model = "typed"
        @keydown="handleTipping"
    />
    <dialog id="errorDialog" class="modal border-1 border-red-600">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Product Passport not found!</h3>
        <p class="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

