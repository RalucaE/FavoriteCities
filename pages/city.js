import CityLayout from "@/components/CityLayout";
import Head from "next/head";
import { getMeteoDetails } from './api/cityApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const CityEntity = require('./../entity/CityEntity');

export default function City() {
    const router = useRouter();
    const { latitude, longitude, cityName } = router.query;
    const [city, setCity] = useState(null);
    
    useEffect(() => {
        const fetchCityData = async () => {
            // Load stored city data from sessionStorage
            const cityDetails = JSON.parse(sessionStorage.getItem('cityDetails') || 'null');
          
            if (cityDetails && latitude && longitude) {
                // Fetch city details from API
                const meteoDetails = await getMeteoDetails(latitude, longitude);
                console.log(meteoDetails);
                // Initialize city based on the fetched and stored data
                const cityEntity = new CityEntity();
                cityEntity.name = cityDetails.name;
                cityEntity.country = cityDetails.country;
                cityEntity.country_code = cityDetails.country_code;
                cityEntity.population = cityDetails.population;
                cityEntity.timezone = cityDetails.timezone;
                cityEntity.latitude = latitude;
                cityEntity.longitude = longitude;
                cityEntity.temperature_2m = meteoDetails.current.temperature_2m;
                cityEntity.wind_speed_10m = meteoDetails.current.wind_speed_10m;
                setCity(cityEntity); // Update state with fully populated city data
            }
        };
        fetchCityData();
    }, [latitude, longitude, cityName]);
    
    return (
        <>
            <Head>
                <title>{city ? city.name : "Loading..."}</title>
            </Head>
            {city ? (
                <CityLayout city={city} />
            ) : (
                <p>Loading city details...</p>
            )}
        </>
    );
}
