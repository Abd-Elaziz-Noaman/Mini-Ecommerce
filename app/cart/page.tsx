"use client";

import styles from "./cart.module.css";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import useCartStore from "../store/cart";
import Link from "next/link";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Cart() {
  const { cartItems }: any = useCartStore();

  const totalPrice = cartItems.reduce(
    (accumulator: number, currentItem: Item) => {
      return accumulator + currentItem.price;
    },
    0
  );

  return (
    <main className={styles.main}>
      <p className={styles.title}>Your Cart</p>
      <br />
      <ItemsTable items={cartItems} />
      <br />
      <section className={styles.detailsContainer}>
        <h1 style={{ color: "#000", fontWeight: "800" }}>
          Total price: {totalPrice}
        </h1>
        <Link href="/checkout">
          <button
            className={styles.proceedToCheckoutBtn}
            disabled={cartItems.length === 0}
          >
            Proceed to checkout
          </button>
        </Link>
      </section>
    </main>
  );
}
