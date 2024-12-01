import CityLayout from "@/components/CityLayout";
import Head from "next/head";
import styles from "@/styles/CityDetails.module.css";
import { getMeteoDetails } from './api/cityApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
const CityModel = require('../models/CityModel');

export default function City() {
    const router = useRouter();
    const [city, setCity] = useState(null);
    const [description, setDescription] = useState(null);
    const [topSights, setTopSights ] = useState(null);
    const [image, setImage] = useState(null);
    const { data: session } = useSession();
    const { latitude, longitude, cityName } = router.query;
    const userEmail = session?.user?.email;
    const [cities, setCities] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
       
        const fetchUserCities = async () => {
          try {
            const response = await fetch(`/api/favoriteCityApi?email=${userEmail}`);
            const data = await response.json();
            setCities(data); 
          } 
          catch (error) {
            console.error('Error fetching cities:', error);
            alert('An error occurred. Please try again.');
          }
        }

        if (userEmail) {
            fetchUserCities();
        }
        const fetchCityData = async () => {
            // Load stored city data from sessionStorage
            const cityDetails = JSON.parse(sessionStorage.getItem('cityDetails') || 'null');           
            const response = await fetch(`/api/cityDetailsApi/${cityDetails.name}`);
            const data = await response.json();   

            setDescription(data[0].description);    
            setTopSights(data[1]);
            setImage(data[2]);   
            if (cityDetails && latitude && longitude && description && topSights && image) {
                // Fetch city details from API
                const meteoDetails = await getMeteoDetails(latitude, longitude);
                // Initialize city based on the fetched and stored data
                const cityModel = new CityModel();
                cityModel.name = cityDetails.name;
                cityModel.country = cityDetails.country;
                cityModel.country_code = cityDetails.country_code;           
                cityModel.population = cityDetails.population;
                cityModel.latitude = latitude;
                cityModel.longitude = longitude;
                cityModel.temperature_2m = meteoDetails.current.temperature_2m;
                cityModel.wind_speed_10m = meteoDetails.current.wind_speed_10m;
                cityModel.description = description;
                cityModel.topSights = topSights;
                cityModel.imagePath = image;
                setCity(cityModel);                               
            }
        };
        fetchCityData();
        if(cities && cityName) {
            if (!cities.some(city => city.name === cityName)) {
                setShowButton(true);
            }
        }

    }, [latitude, longitude, cityName, image, userEmail]);
    
    const handleAddToFavorites = async (e) => {
        e.preventDefault();    
        try {
            const response = await fetch(`/api/favoriteCityApi?email=${userEmail}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(city),
              });
            if (response.ok) {
              alert('city added successfully');              
            } else {
              const errorData = await response.json();
              alert(errorData.error || 'Failed to add city');
            }
        } catch (error) {
            console.error('Error adding city:', error);
            alert('An error occurred. Please try again.');
        }
    };
    return (
        <>
            <Head>
                <title>{city ? city.name : "Loading..."}</title>
            </Head>
            {city ? (
                <>
                {showButton ? (
                    <button className={styles.button} onClick={handleAddToFavorites}>
                        Add to Favorites
                    </button>
                ) : (
                    <p></p>)
                }
                <CityLayout city={city} />                  
                </>
            ) : (
                <p>Loading city details...</p>
            )}
        </>
    );
}