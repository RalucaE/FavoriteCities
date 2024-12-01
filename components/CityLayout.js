import React from 'react';
import styles from "@/styles/City.module.css";

const CityLayout = ({ city }) => { 
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>{city.name}</h1>    
            <div className={styles.container}>               
                <div>
                    <h2 className={styles.subtitle}>Description</h2>
                    <p>{city.description}</p>
                    <div className={styles.details}>
                        <div>
                            <h2 className={styles.subtitle}>General information</h2>
                            <p><strong>Country:</strong> {city.country}</p>
                            <p><strong>Country code:</strong> {city.country_code}</p>
                            <p><strong>Population:</strong> {city.population}</p>                                        
                            <p><strong>Latitude:</strong> {city.latitude}</p>
                            <p><strong>Longitude:</strong> {city.longitude}</p>       
                        </div>            
                        <div>
                            <h2 className={styles.subtitle}> Current Meteo info</h2>
                            <p><strong>Temperature:</strong> {city.temperature_2m}°C</p>
                            <p><strong>Wind Speed:</strong> {city.wind_speed_10m} km/h</p>   
                        </div>          
                    </div>                            
                </div>
                <img src={city.imagePath} alt="Menu Icon" className={styles.img}/>                                
            </div>
            <div className={styles.sights}> 
                <h1 className={styles.title}>Top sights</h1> 
                <ul className={styles.list}>
                    {city.topSights.map((sight, index) => (
                        <li key={index} className={styles.listItem}>
                            {sight.title} - {sight.description}
                        </li>
                    ))}
                </ul>
            </div>    
        </div>
    );
}; 
export default CityLayout;