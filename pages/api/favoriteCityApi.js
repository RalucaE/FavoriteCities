import AppDataSource from "@/utils/data-source";
import City from "@/entities/City";
import User from "@/entities/User";

export default async function handler(req, res) {
  if(!AppDataSource.isInitialized){
    await AppDataSource.initialize();
  }

  const  queryEmail  = req.query.email;
  const cityRepo = AppDataSource.getRepository(City);
  const userRepo = AppDataSource.getRepository(User);

  if (!queryEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (req.method === "POST") {
    const {
      name,
      country,
      country_code,
      population,
      timezone,
      latitude,
      longitude,
      temperature_2m,
      wind_speed_10m,
      description, 
      topSights,
      imagePath,
    } = req.body;

    try {
      const user = await userRepo.findOne({ where: { email:  queryEmail } });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Create a new city and associate it with the user
      const city = cityRepo.create({
        name,
        country,
        country_code,
        population,
        timezone,
        latitude,
        longitude,
        temperature_2m,
        wind_speed_10m,
        description,
        topSights,
        imagePath,
        user
      });
      await cityRepo.save(city);
      return res.status(200).json({ message: "City added to favorites", city });
    } catch (error) {
      console.error('Error adding city to favorites:', error);
      return res.status(500).json({ error: "Failed to add city to favorites" });
    }
  } 
  else {
    try {
      // Find the user and their associated cities
      const user = await userRepo.findOne({ where: { email: queryEmail }, relations: ["cities"] });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Return the cities associated with the user
      return res.status(200).json(user.cities);
    } catch (error) {
      console.error("Error fetching user's favorite cities:", error);
      return res.status(500).json({ error: "Failed to fetch favorite cities" });
    }
  }
}