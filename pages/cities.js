import Head from "next/head";
import styles from "@/styles/Cities.module.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cities() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [cities, setCities] = useState(null);
    const fetch = require('node-fetch');
    const getLocation = async () =>  {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {                  
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude)                
                },           
            );
        } 
    }
   
    useEffect(() => {
        const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}+${longitude}/nearbyCities?types=CITY`;
        const fetchCityData = async () => {
            if(latitude && longitude) {
                const response = await fetch((apiUrl), {              
                    headers: {
                        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                        'x-rapidapi-key': 'a9be86cd18mshddd4f0f5d26df07p11167bjsn40b94b8f3e16'
                    }
                });
                const data = await response.json();
                setCities(data.data);
            }
        };
        fetchCityData();
    
    }, [latitude, longitude]);
    const handleCityClick = (city) => {
        sessionStorage.setItem('cityDetails', JSON.stringify(city)); 
      };
    return (
        <>
            <Head>
                <title>Cities</title>
            </Head>
            <main className={styles.main}> 
                <h1>Cities by location</h1>
                <button className={styles.button} onClick={getLocation}>Find my location</button>            
                {latitude & longitude ? (
                    <p>Latitudine: {latitude} Longitudine: {longitude}</p>
                ) : (
                    <p></p>
                )}
                <div className={styles.results}>
                    <ul className={styles.list}>
                        {cities ? (
                            cities.map((city, index) => (
                                <Link  key={city.id}
                                href={{
                                pathname: '/city',
                                query: { latitude: city.latitude, longitude: city.longitude, cityName: city.name },
                                }}>
                                    <li key={index} className={styles.item} onClick={() => handleCityClick(city)} >
                                        {city.name} - {city.country}
                                        <hr className={styles.hr}></hr>
                                        Latitude: {city.latitude}
                                        <br></br>
                                        Longitude: {city.longitude} 
                                        <br></br>
                                        Distance: {city.distance}                                      
                                    </li>
                                </Link>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </ul>
                </div>
            </main>
        </>
    );
}