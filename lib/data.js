
// utils/getCurrentLocation.js
export async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();

                    // Most specific area
                    const area =
                        data.address.neighbourhood ||
                        data.address.suburb ||
                        data.address.village ||
                        data.address.town ||
                        'Unknown area';

                    // City (fallback to town/village if city not available)
                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        'Unknown city';

                    resolve({ latitude, longitude, area, city });
                } catch (err) {
                    reject('Failed to fetch location info');
                }
            },
            (err) => reject(err.message)
        );
    });
}

export function parseResponse(text) {
    return text
        .split(/\n?\d+[\.\)]\s+/)
        .filter(item => item.trim().length > 0)
        .map(item => item.replace(/"/g, "").trim());
}