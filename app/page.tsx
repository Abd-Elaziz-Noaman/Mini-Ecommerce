import HomePage from "./components/Home/Home";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  );
}
