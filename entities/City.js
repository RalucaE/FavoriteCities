import { EntitySchema } from "typeorm";
import User from "@/entities/User";

const City = new EntitySchema({
  name: "City",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true, // Automatically generated ID
    },
    name: {
      type: "varchar", // Name of the city (string)
    },
    country: {
      type: "varchar", // Country where the city is located
    },
    country_code: {
      type: "varchar", // Country code (e.g., 'US', 'FR')
    },
    population: {
      type: "int", // Population of the city
    },
    latitude: {
      type: "float", // Latitude coordinate of the city
    },
    longitude: {
      type: "float", // Longitude coordinate of the city
    },
    temperature_2m: {
      type: "float", // Temperature at 2 meters above the ground (in Celsius)
    },
    wind_speed_10m: {
      type: "float", // Wind speed at 10 meters above the ground (in meters per second)
    },
    description: {
      type: "varchar", // Timezone of the city (e.g., 'America/New_York')
    },
    topSights: {
      type: "varchar", // Store array as a JSON string
    },
    imagePath: {
      type: "varchar", // Timezone of the city (e.g., 'America/New_York')
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User", // This references the User entity
      inverseSide: "cities",
      joinColumn: {
        name: "userEmail", // This will create the foreign key column in the `City` table
      },
    },
  },
});

export default City
