<script setup >
import imp from "../images/IMP.png";
import imm from "../images/IMM.png";
import mtl from "../images/MTL.png";
import mat from "../images/MAT.png";
import {onMounted, ref} from "vue";
import {store} from "../store.js";
import {AwsConnector} from "../scripts/awsconnector.ts";

const selectedProperties = ref({})
const selectedSubmodel = ref("Nameplate")
const isPublished = ref(false)

  onMounted(() => {
    onChangeSubmodel()
  })

  function onChangeSubmodel() {
    const shortId = selectedSubmodel.value.replace(/\s+/g, '');
    selectedProperties.value = store.getPropertyRecords(shortId)
  }

  function publishAas() {
    const sender = new AwsConnector()
    sender.uploadData(store.meta.serializeAas())
    isPublished.value = true
    setTimeout(() => {
      isPublished.value = false
    }, 5000)
  }
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex flex-row items-start">
      <button @click="publishAas" class="btn btn-primary">Publish Passport</button>
      <button @click="" class="btn btn-primary ml-10">Request Measurement</button>
    </div>
    <div class="flex flex-row  w-11/12">
      <div class="flex flex-row w-full">
        <div class="flex flex-col">
          <div class="bg-white rounded-lg p-4 mt-10">
            <div class="flex flex-row justify-between items-center w-11/12 ml-5">
              <h1 class="font-bold text-2xl">Frisbee Asset</h1>
            </div>
            <div class="flex flex-row justify-between items-center w-full">
              <img :src=imp alt="Frisbee Placeholder" class="h-48 m-6"/>
              <div class="flex flex-col mr-16">
                <b class="mt-2">Product Unique Identifier</b>
                <i>amids://fasan.lit/CD8CD211</i>
                <b class="mt-8">Product Manufacturer</b>
                <i>LIT Factory</i>
                <b class="mt-8">Day of Production</b>
                <i>24.08.2024</i>
              </div>
            </div>
          </div>
          <div class="flex flex-col bg-white rounded-lg p-4 mt-8 pb-12">
            <h1 class="font-bold text-2xl mb-5 ml-5">Connected Assets</h1>
            <div class="flex flex-row justify-between items-center w-full">
              <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Injection Moulding Machine">
                <img :src="imm" alt="Injection Moulding Machine AAS" class="h-36 mx-3"/>
              </div>
              <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Injection Moulding Tool">
                <img :src="mtl" alt="Injection Moulding Tool AAS" class="h-36 mx-3"/>
              </div>
              <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Polymer Granulate">
                <img :src="mat" alt="Material AAS" class="h-36 mx-3"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-2/3 bg-white rounded-lg ml-8 mt-10">
          <div class="flex flex-row justify-between items-center w-full p-4">
            <h1 class="font-bold text-2xl ml-6">Asset Administration Shell Data</h1>
            <select v-model="selectedSubmodel" @change="onChangeSubmodel" class="select select-secondary w-1/2">
              <option disabled selected>Select Submodel</option>
              <option>Nameplate</option>
              <option>Technical Data</option>
              <option>Production Data</option>
              <option>Quality Data</option>
            </select>
          </div>
          <div class="overflow-x-auto mx-12">
            <table class="table">
              <!-- head -->
              <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Value</th>
                <th>IRI</th>
              </tr>
              </thead>
              <tbody>
              <!-- row 1 -->
              <tr v-for="property in selectedProperties">
                <td>Property</td>
                <td>{{property.idShort}}</td>
                <td>{{property.value + " " + property.unit}}</td>
                <td>{{property.iri}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isPublished" role="alert" class="alert alert-success">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Product passport published!</span>
    </div>
  </div>
</template>

