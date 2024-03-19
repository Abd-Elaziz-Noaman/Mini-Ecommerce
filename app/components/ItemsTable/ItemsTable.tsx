import { usePathname } from "next/navigation";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import useCartStore from "../../store/cart";

import styles from "./ItemsTable.module.css";
import Link from "next/link";
import { memo } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ItemsTableProps {
  items: Item[];
  sortHandler?: (sortField: string) => void;
  sortBy?: string;
  sortOrder?: string;
}

const ItemsTable = ({
  items,
  sortHandler,
  sortBy,
  sortOrder,
}: ItemsTableProps) => {
  const { cartItems, addItem, removeItem }: any = useCartStore();
  const pathname = usePathname();

  const addItemHandler = (item: Item) => {
    addItem(item);
  };

  const removeItemHandler = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <section className={styles.itemsContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {pathname === "/" ? (
              <th className={styles.th} onClick={() => sortHandler?.("name")}>
                Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            ) : (
              <th className={styles.th}>Name</th>
            )}
            <th className={styles.th}>Description</th>
            {pathname === "/" ? (
              <th className={styles.th} onClick={() => sortHandler?.("price")}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            ) : (
              <th className={styles.th}>Price</th>
            )}
            <th className={styles.th}>
              {pathname === "/" ? "add/remove to cart" : "remove from cart"}
            </th>
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
                  onClick={() =>
                    !cartItems.some((ele: Item) => ele.id === item.id)
                      ? addItemHandler(item)
                      : removeItemHandler(item.id)
                  }
                >
                  {!cartItems.some((ele: Item) => ele.id === item.id) ? (
                    <IoIosAddCircle />
                  ) : (
                    <IoIosRemoveCircle />
                  )}
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
            <h2 className={styles.link}>Let&apos;s add some?</h2>
          </Link>
        </div>
      )}
      <div className={styles.tip}>Click on table head to sort</div>
    </section>
  );
};

export default memo(ItemsTable);
