import { DataSource } from "typeorm"
import User from "@/entities/User";
import City from "@/entities/City";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false, 
  entities: [City, User], 
});

AppDataSource.initialize() 
  .then(async () => {
    console.log("Data Source has been initialized!");
     const userRepo = AppDataSource.getRepository(User);
     const users = await userRepo.find();
     console.log("users", users);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource