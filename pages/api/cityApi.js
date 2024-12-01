export async function getCityDetails(cityName) {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Failed to fetch city data:", error);
    return null;
  }
}

export async function getMeteoDetails(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=wind_speed_10m,temperature_2m,relative_humidity_2m`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch city data:", error);
        return null;
    }
}