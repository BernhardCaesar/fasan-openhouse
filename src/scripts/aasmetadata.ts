import * as aas from "@aas-core-works/aas-core3.0-typescript";
import {shell} from "./shell.ts";
import * as CryptoJS from 'crypto-js';


type DisplayProperty = {
    idShort: string;
    iri: string;
    value: any;
    unit: string;
}

export class AasMetadata {
    private readonly _propertyRecords: Record<string, DisplayProperty[]> | null
    private readonly _shell: aas.types.Environment


    constructor() {
        this._shell = this.readInAas()
        this._propertyRecords = this.getPropertyRecord(this._shell)
    }

    public getPropertiesByKey(key: string) {
        return this._propertyRecords![key];
    }

     updateSubmodelProperties(submodelIdShort: string, updatedProperties: DisplayProperty[]) {
        const submodelRecord = this._propertyRecords![submodelIdShort]
         for (const record of submodelRecord) {
             record.value = updatedProperties.find(p => p.idShort === record.idShort)?.value || record.value
         }


        const submodel = this._shell.submodels?.find(s => s.idShort == submodelIdShort)
        if (!submodel) return

        for (const element of submodel.submodelElements!) {
            if (aas.types.isProperty(element)) {
                const updatedProperty = updatedProperties.find(p => p.idShort === element.idShort)
                if (updatedProperty) {
                    element.value = updatedProperty.value;
                }
            }
        }
    }

    serializeAas(): string {
        const jsonable = aas.jsonization.toJsonable(this._shell)
        return JSON.stringify(jsonable, null, 2)
    }

    private readInAas(): aas.types.Environment {
        const parsedJSon = JSON.parse(shell)
        const env = aas.jsonization.environmentFromJsonable(parsedJSon)
        return env.mustValue()
    }

    private getPropertyRecord(env: aas.types.Environment): Record<string, DisplayProperty[]> | null {
        if (env.assetAdministrationShells?.length === 0 || env.submodels?.length === 0) {
            return null
        }

        // works only with layer-1 aas shells
        const displayProperties: Record<string, DisplayProperty[]> = {}
        for (const submodel of env.submodels!) {
            let submodelProperties: DisplayProperty[] = []
            for (const element of submodel.submodelElements!) {
                if (aas.types.isProperty(element)) {
                    const iri = makePropertyIri(submodel.id, element.idShort!)
                    element.displayName = [new aas.types.LangStringNameType("en", iri)]
                    let unit = element.description?.[0].text ?? ""
                    submodelProperties.push({idShort: element.idShort!, iri, value: element.value, unit: unit})
                }
            }
            displayProperties[submodel.idShort!] = submodelProperties
        }
        return displayProperties
    }
}

function hashId(id: string, length: number = 8): string {
    const hash = CryptoJS.SHA256(id).toString(CryptoJS.enc.Hex).toUpperCase();
    return hash.substring(0, Math.min(length, hash.length));
}

function makePropertyIri(submodelHash: string, property: string): string {
    return submodelHash + "#" + hashId(property);
}




