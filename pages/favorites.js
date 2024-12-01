import Head from "next/head";
import Link from 'next/link';
import styles from "@/styles/Favorites.module.css";
import { useEffect, useState } from 'react';
import { useSession, signIn } from "next-auth/react";

export default function Favorites() {
  const [cities, setCities] = useState(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;
    const fetchCityData = async () => {
      try {
        const response = await fetch(`/api/favoriteCityApi?email=${userEmail}`);
        const data = await response.json();
        setCities(data); 
      } 
      catch (error) {
        console.error('Error fetching city:', error);
        alert('An error occurred. Please try again.');
      }
    }
    fetchCityData();
  }, [userEmail]);
  const handleCityClick = (city) => {
    sessionStorage.setItem('cityDetails', JSON.stringify(city)); 
  };
  return (    
    <>
      <Head>
            <title>FavoriteCities</title>
      </Head>
      <div className={styles.page}> 
        <main className={styles.main}>
          {userEmail ? (
            <>
              <h1>Favorite Cities</h1>
              <div className={styles.results}>
                <ul className={styles.list}>
                  {cities ? (
                    cities.map((city) =>                                     
                    <Link  key={city.id}
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
                        </li>
                   </Link>
                  )                 
                  ) : (
                    <li>Loading cities...</li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <h1> Go to login</h1>
              <button className={styles.button} onClick={() => signIn()}>Login</button>
            </>
          )}
        </main>
      </div>
    </>
  )
}