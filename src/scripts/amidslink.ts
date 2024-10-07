import * as aas from "@aas-core-works/aas-core3.0-typescript";

type LivingLabResponse = {
    assetID: string,
    offeringID: string,
    versionID: string,
    url: string,
}

export async function requestMass() { try {
    const response = await callAmids('/mass', null, 'GET')
    if (!response.ok) {
        return guestimateScaleValue()
    }
    return JSON.parse(await response.text()) as number;
    } catch (error) {
        return  guestimateScaleValue()
    }
}

export async function uploadShell(jsonObjectShell: aas.jsonization.JsonObject) {
    const body = {
        filename: "aas.json",
        name: "AAS",
        description: "AAS-File",
        aasjson: jsonObjectShell,
    };

    const response = await callAmids('/createOffering', body, 'POST') as LivingLabResponse
    console.log(`Shell was successfully uploaded with OfferingID: ${response.offeringID}`);
}

async function callAmids(url: string, body: any, method: string): Promise<any> {
    const username = "test";
    const password = "avfoe-mzov-mdlf";

    const basicAuth = btoa(`${username}:${password}`);
    const headers = new Headers({
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });

    try {
        let info: any
        if (body === null) {
            info = {
                method: method,
                headers: headers,
                mode: 'cors',
                credentials: 'include',
            }
        } else {
            info = {
                method: method,
                headers: headers,
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(body),
            }
        }

        const response = await fetch(url, info);

        if (!response.ok) {
            console.error("API connection failed!");
            console.error(`Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`Response body: ${text}`);

            // Handle specific HTTP status codes
            switch (response.status) {
                case 401:
                    throw new Error('Authentication failed. Please check credentials.');
                case 403:
                    throw new Error('Access forbidden. You may not have the right permissions.');
                case 404:
                    throw new Error('API endpoint not found.');
                case 500:
                    throw new Error('Server error. Please try again later.');
                default:
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            console.error('Network error or CORS issue:', error);
            console.error('This might be due to CORS restrictions or the server being unavailable.');
        } else {
            console.error('Error:', error);
        }
        return null;
    }
}

async function guestimateScaleValue() {
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await delay(3600); // Wait for 6 seconds
    return getRandomIntBetween(500.00, 500.05)
}

function getRandomIntBetween(min: number, max: number): number {
    // Scale the range to integers by multiplying by 1000 (3 decimal places)
    const scaledMin = Math.ceil(min * 1000);   // 500.00 -> 500000
    const scaledMax = Math.floor(max * 1000);  // 500.05 -> 500050

    // Generate a random integer within the scaled range
    const randomInt = Math.floor(Math.random() * (scaledMax - scaledMin + 1)) + scaledMin;

    // Scale the random integer back to the original range
    return randomInt / 1000;
}