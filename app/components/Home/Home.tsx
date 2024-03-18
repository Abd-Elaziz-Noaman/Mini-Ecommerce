"use client";

import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";

import styles from "./Home.module.css";
// import items from "../../../public/itemsData.json";
// console.log("🚀 ~ items:", items);

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/itemsData.json");
      const jsonData = await response.json();
      console.log("🚀 ~ fetchItems ~ jsonData:", jsonData);
      setItems(jsonData);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <main className={styles.main}>
      <section className={styles.itemsContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>add to cart</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {items.map((item) => (
              <tr key={item.id} className={styles.tr}>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>{item.price}</td>
                <td className={styles.td}>
                  <button className={styles.iconButton}>
                    <IoIosAddCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default HomePage;

{
  /* <section className={styles.itemsContainer}>
<div className={styles.gridContainer}>
  {Object.keys(items[0]).map((key) => (
    <>
      {key !== "id" && (
        <div key={key}>
          <h3 className={`${styles.gridItem} ${styles.head}`}>{key}</h3>
          <ul>
            {items.map((item: any) => (
              <li key={item.id} className={styles.gridItem}>
                {item[key]}
                {key === "price" && (
                  <button className={styles.iconButton}>
                    <IoIosAddCircle
                      // size={18}
                      style={
                        {
                          // marginLeft: "20px",
                        }
                      }
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  ))}
</div>
</section> */
}

{
  /* <div className={`${styles.flexContainer} ${styles.head}`}>
<h3 className={styles.flexItem}>Name</h3>
<h3 className={styles.flexItem}>Description</h3>
<h3 className={styles.flexItem}>Price</h3>
<h3 className={styles.flexItem}>add to cart</h3>
</div>
{items.map((item) => (
<div className={styles.flexContainer}>
  <p className={styles.flexItem}>{item.name}</p>
  <p className={styles.flexItem}>{item.description}</p>
  <p className={styles.flexItem}>{item.price}</p>
  <div className={styles.flexItem}>
    <button className={styles.iconButton}></button>
  </div>
</div>
))} */
}
