"use client";

import styles from "./cart.module.css";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import useCartStore from "../store/cart";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Cart() {
  const { items }: any = useCartStore();

  const totalPrice = items.reduce((accumulator: number, currentItem: Item) => {
    return accumulator + currentItem.price;
  }, 0);

  return (
    <main className={styles.main}>
      <ItemsTable items={items} />
      <br />
      <section className={styles.detailsContainer}>
        <h1 style={{ color: "#000", fontWeight: "800" }}>
          Total price: {totalPrice}
        </h1>
        <button className={styles.proceedToCheckoutBtn}>
          Proceed to checkout
        </button>
      </section>
    </main>
  );
}
