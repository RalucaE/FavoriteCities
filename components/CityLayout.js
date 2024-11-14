// City.js
import React from 'react';
import styles from "@/styles/City.module.css";
const CityLayout = ({ city }) => {
 console.log(city);
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>{city.name}</h2>
            <div className={styles.cityDetails}>
                <p><strong>Country:</strong> {city.country}</p>
                <p><strong>Country code:</strong> {city.country_code}</p>
                <p><strong>Population:</strong> {city.population}</p>
                <p><strong>Timezone:</strong> {city.timezone}</p>                
                <p><strong>Latitude:</strong> {city.latitude}</p>
                <p><strong>Longitude:</strong> {city.longitude}</p>
                <h2 className={styles.subtitle} > Current Meteo info</h2>
                <p><strong>Temperature:</strong> {city.temperature_2m}°C</p>
                <p><strong>Wind Speed:</strong> {city.wind_speed_10m} km/h</p>               
            </div>
        </div>
    );
}; 


export default CityLayout;
