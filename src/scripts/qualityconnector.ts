
export async function getScale() {
    let weight: number;
    try {
        const response  = await fetch("http://localhost:8080/scale")
        if (!response.ok) {
            weight = guestimateScaleValue()
        }
        return JSON.parse(await response.text()) as number;
    } catch (error) {
        weight = guestimateScaleValue()
    }
    return weight;
}

function guestimateScaleValue() {
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



