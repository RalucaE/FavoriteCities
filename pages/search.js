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
        console.log(cityName);
          const cityData = await getCityDetails(cityName);
          console.log(cityData.results);
          setCityData(cityData.results);
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
              <ul>
                {cityData.map((city, index) => (             
                  <Link  key={index}
                    href={{
                     pathname: '/city',
                     query: { latitude: city.latitude, longitude: city.longitude, cityName: city.name },
                    }}>
                      <li className={styles.item} onClick={() => handleCityClick(city)}>
                        {city.name}, {city.country} - Latitude: {city.latitude}, Longitude: {city.longitude}
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