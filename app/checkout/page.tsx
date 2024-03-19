"use client";

import { toast } from "react-toastify";

import styles from "../cart/cart.module.css";
import checkoutStyles from "./checkout.module.css";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import useCartStore from "../store/cart";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Checkout() {
  const { cartItems }: any = useCartStore();

  const submitHandler = () => {
    setTimeout(() => toast.success("Order has been submitted."), 200);
  };

  const totalPrice = cartItems.reduce(
    (accumulator: number, currentItem: Item) => {
      return accumulator + currentItem.price;
    },
    0
  );

  return (
    <main className={styles.main}>
      <p className={styles.title}>Checkout</p>
      <br />
      <ItemsTable items={cartItems} />
      <br />
      <section className={styles.detailsContainer}>
        <h1 style={{ color: "#000", fontWeight: "800" }}>
          Total price: {totalPrice} EGP
        </h1>
        <h1 style={{ color: "#000", fontWeight: "800" }}>
          Total Items: {cartItems.length}
        </h1>
      </section>
      <button className={checkoutStyles.submitBtn} onClick={submitHandler}>
        Submit Your Order
      </button>
    </main>
  );
}
