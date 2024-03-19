"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const { cartItems, resetCartItems }: any = useCartStore();
  const router = useRouter();

  const submitHandler = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success("Order has been submitted.");
        resolve();
      }, 200);
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        router.push("/");
        resolve();
      }, 2000);
    });

    resetCartItems();
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
