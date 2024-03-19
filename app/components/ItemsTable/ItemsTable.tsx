import { IoIosAddCircle } from "react-icons/io";
import useCartStore from "../../store/cart";

import styles from "./ItemsTable.module.css";
import Link from "next/link";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ItemsTableProps {
  items: Item[];
  sortHandler: (sortField: string) => void;
  sortBy: string;
  sortOrder: string;
}

export default function ItemsTable({
  items,
  sortHandler,
  sortBy,
  sortOrder,
}: ItemsTableProps) {
  const { addItem }: any = useCartStore();

  const addItemHandler = (item: Item) => {
    addItem(item);
  };

  return (
    <section className={styles.itemsContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th} onClick={() => sortHandler("name")}>
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className={styles.th}>Description</th>
            <th className={styles.th} onClick={() => sortHandler("price")}>
              Price {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
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
                <button
                  className={styles.iconButton}
                  onClick={() => addItemHandler(item)}
                >
                  <IoIosAddCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <div className={styles.nodataContainer}>
          <h1>There are no items yet!</h1>
          <Link href="/">
            <h2 className={styles.link}>Let's add some?</h2>
          </Link>
        </div>
      )}
      <div className={styles.tip}>Click on table head to sort</div>
    </section>
  );
}
