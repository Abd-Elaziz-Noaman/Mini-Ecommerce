import { IoIosAddCircle } from "react-icons/io";

import styles from "./ItemsTable.module.css";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ItemsTableProps {
  items: Item[];
}

export default function ItemsTable({ items }: ItemsTableProps) {
  return (
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
  );
}
