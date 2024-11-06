import styles from "@/styles/Search.module.css";
import Head from "next/head";

export default function Search() {
  return (        
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.h1}> Search for a city</h1>     
          <input className={styles.input}  type="text"/>
        </main>
      </div>
    </>
  );
}