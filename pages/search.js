import { useState } from "react";
import styles from "@/styles/Search.module.css";
import Head from "next/head";
import Link from 'next/link';
import { getCityDetails } from './api/cityApi';

export default function Search() {
  const [cityName, setCityName] = useState(""); 
  const [cityData, setCityData] = useState("");

    const handleSearch = async () => {
      try {  
        const response = await getCityDetails(cityName);     
          setCityData(response.results);
      } catch (error) {
          console.error('City not found');
      }
  };
  const handleCityClick = (city) => {
    sessionStorage.setItem('cityDetails', JSON.stringify(city)); 
  };
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.h1}>Search for a city</h1>     
          <input
            className={styles.input}
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
          />
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
          {cityData && (
            <div className={styles.results}>
              <ul className={styles.list}>
                {cityData.map((city, index) => (             
                  <Link  key={index}
                    href={{
                     pathname: '/city',
                     query: { latitude: city.latitude, longitude: city.longitude, cityName: city.name },
                    }}>
                      <li className={styles.item} onClick={() => handleCityClick(city)}>
                        {city.name} - {city.country}
                        <hr className={styles.hr}></hr>
                        Latitude: {city.latitude}
                        <br></br>
                        Longitude: {city.longitude}
                        <br></br>
                        Population: {city.population}                         
                      </li>
                  </Link>             
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </>
  ); 
}