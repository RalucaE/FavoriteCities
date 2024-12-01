import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AppDataSource from "@/utils/data-source";
import User from "@/entities/User";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
        credentials: {
          username: { label: "Username", type: "text"},
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {      
          const { username, password } = credentials;
          
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }
          
          const userRepo = AppDataSource.getRepository(User);
          try {
            // Find the user by email
            const user = await userRepo.findOne({ where: { email: `${username}@gmail.com` } });
            console.log(user);
            if (!user) {
              throw new Error("User not found.");
            }
          
            if (!password || !user.password) {
              throw new Error("Invalid username or password.");
            }
          
            // Compare the provided password with the stored hashed password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
              throw new Error("Incorrect password.");
            }
            console.log("user", user);
            // Return user information to be encoded in the JWT
            return {           
              name: user.name,
              email: user.email,
            };
          } catch (error) {
            console.error("Error in login:", error);
            throw new Error(error.message || "Internal server error");
          }
        },
      }),
  ],
  session: {
    strategy: "jwt", // Use "jwt" for stateless sessions
    maxAge: 30 * 60, // Session expires after 30 minutes (in seconds)
  },
  jwt: {
    maxAge: 30 * 60, // JWT token expires after 30 minutes (in seconds)
  },
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
}

export default NextAuth(authOptions)