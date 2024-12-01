import AppDataSource from "@/utils/data-source";
import User from "@/entities/User";

export default async function handler(req, res) {

  if(!AppDataSource.isInitialized){
      await AppDataSource.initialize();
  }
  const userRepo = AppDataSource.getRepository(User);

  if (req.method === "POST") {
  
    const { name, email } = req.body;
    const user = { name, email };
    await userRepo.save(user);
    res.status(200).json({ message: "User created", user });
  } else {
    const users = await userRepo.find();
    res.status(200).json(users); 
  }
}