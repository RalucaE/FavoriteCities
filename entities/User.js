import { EntitySchema } from "typeorm";
import  City  from "@/entities/City";

const User = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    cities: {
      type: "one-to-many", // One user can have more cities
      target: "City", // The related entity (City)
      inverseSide: "user", // This refers to the `user` property in the City entity
      cascade: true, // Optional, allows for cascading operations (e.g., saving cities when saving user)
    },
  },
});

export default User