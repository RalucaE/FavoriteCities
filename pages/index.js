import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Favorite Cities</h1>  
          <img src="/images/landscape.avif" alt="Menu Icon" className={styles.img} />      
        </main>
      </div>
    </>
  );
}