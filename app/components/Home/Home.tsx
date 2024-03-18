import styles from "./Home.module.css";
import items from "../../helpers/itemsData.json";
console.log("🚀 ~ items:", items);

const HomePage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.gridContainer}>
        <div className={`${styles.gridItem} ${styles.head}`}>Name</div>
        <div className={`${styles.gridItem} ${styles.head}`}>Description</div>
        <div className={`${styles.gridItem} ${styles.head}`}>Price</div>
      </section>
      <section className={styles.gridContainer}>
        {items?.map((item) => (
          <div key={item.id}>
            <div className={styles.gridItem}>{item.name}</div>
            <div className={styles.gridItem}>{item.description}</div>
            <div className={styles.gridItem}>{item.price}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
