import { useState } from "react";
import { signIn } from "next-auth/react"; 
import styles from "@/styles/Register.module.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use NextAuth's signIn function
      const result = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (result.error) {
        setMessage("Login failed: " + result.error);
      } else {
        setMessage("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <input
        className={styles.input}
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <br />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
}
