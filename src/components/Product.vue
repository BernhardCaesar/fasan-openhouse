<script setup lang="ts">
  import imp from "../images/IMP.png";
  import imm from "../images/IMM.png";
  import mtl from "../images/MTL.png";
  import mat from "../images/MAT.png";
  import {onMounted, ref} from "vue";
  import {store} from "../store.js";
  import {getDateTime} from "../scripts/datatime.ts";
  import {requestMass, uploadShell} from "../scripts/amidslink.ts";

  const selectedProperties = ref({})
  const selectedSubmodel = ref("Nameplate")

  const successMessage = ref("")
  const isSuccess = ref(false)

  const measurementCounter = ref(1)

  onMounted(() => {
    onChangeSubmodel()
  })

  async function onChangeSubmodel() {
    const shortId = selectedSubmodel.value.replace(/\s+/g, '');
    selectedProperties.value = store.getPropertyRecords(shortId)
  }

  async function showSuccess(message: string) {
    successMessage.value = message
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
    }, 3000)
  }


  async function handleMeasurementRequest(): Promise<number> {
    const weight = await requestMass()

    const updates = [
      { type: "Property", idShort: "MeasurementId", iri: "", value: measurementCounter.value, unit: "" },
      { type: "Property", idShort: "DateOfQualityInspection", iri: "", value: getDateTime(), unit: ""},
      { type: "Property", idShort: "MeasuredMass", iri: "", value:weight, unit: "" }
    ]

    store.meta.updateSubmodelProperties("QualityData", updates);
    await showSuccess("Productpass successfully synchronized!");
    measurementCounter.value += 1;
  }

  async function publishAas() {
    const aasObject = store.meta.serializeAas()
    const response = await uploadShell(aasObject)
    if (response !== null) {
      await showSuccess("Productpass successfully published!")
    }

  }

</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex flex-row justify-end w-full mt-4">
      <button @click="handleMeasurementRequest" class="btn btn-secondary">Request Measurement</button>
      <button @click="publishAas" class="btn btn-primary mx-8">Publish Passport</button>
    </div>
    <div class="flex flex-row w-11/12">
      <div class="flex flex-row -mt-6 w-full">
        <div class="flex flex-col">
          <div class="bg-white rounded-lg p-4 mt-10">
            <div class="flex flex-row justify-between items-center w-11/12 ml-5">
              <h1 class="font-bold text-2xl">6DC Product Asset</h1>
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
                <td>{{ property.type }}</td>
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
    <div v-show="isSuccess" role="alert" class="alert alert-success mt-4 w-11/12">
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
      <span>{{ successMessage }}</span>
    </div>
  </div>
</template>

