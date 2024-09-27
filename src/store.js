import {reactive, toRaw} from 'vue'
import {AasMetadata} from "./scripts/aasmetadata.ts";


export const store = reactive({
    productview: false,
    products: ["6DC_V5"],
    selectedCube: "",
    meta: new AasMetadata(),
    getPropertyRecords(key) {
        return toRaw(this.meta.getPropertiesByKey(key))
    },
})
