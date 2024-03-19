"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";

import useCartStore from "../../store/cart";

import styles from "./Home.module.css";
import ItemsTable from "../ItemsTable/ItemsTable";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage = () => {
  const { items }: any = useCartStore();
  const [fetchedItems, setFetchedItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    console.log(loading);
    try {
      const response = await fetch("/itemsData.json");
      const jsonData = await response.json();
      // console.log("🚀 ~ fetchItems ~ jsonData:", jsonData);
      setFetchedItems(jsonData);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
    console.log(loading);
  };
  console.log("afterrrr", loading);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const priceFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || null;
    setPriceFilter(value);
  };

  const minPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || null;
    setMinPrice(value);
  };

  const maxPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || null;
    setMaxPrice(value);
  };

  const filteredItems = fetchedItems.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceFilterMatch = priceFilter === null || item.price === priceFilter;
    const priceRangeMatch =
      (minPrice === null || item.price >= minPrice) &&
      (maxPrice === null || item.price <= maxPrice);
    return nameMatch && priceFilterMatch && priceRangeMatch;
  });
  // console.log("🚀 ~ filteredItems ~ filteredItems:", filteredItems);

  if (loading)
    return (
      <div className={styles.loadingWrapper}>
        <PuffLoader color="#000" size={100} loading speedMultiplier={3} />
      </div>
    );

  return (
    <main className={styles.main}>
      <Link href="/cart">
        <div className={styles.cartBadge}>
          <FaShoppingCart size={50} />
          <p className={styles.cartNumber}>{items.length}</p>
        </div>
      </Link>
      <div className={styles.searchbarContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={searchHandler}
          placeholder="Search by item name"
          className={styles.searchbar}
        />
      </div>
      <br />
      <div className={styles.filtersContainer}>
        <input
          type="number"
          value={priceFilter || ""}
          onChange={priceFilterHandler}
          placeholder="Price"
          className={styles.filterInput}
          style={{ width: "30%" }}
        />
        <div className={styles.priceRangeContainer}>
          <input
            type="number"
            value={minPrice || ""}
            onChange={minPriceHandler}
            placeholder="Min price"
            className={styles.filterInput}
          />
          <input
            type="number"
            value={maxPrice || ""}
            onChange={maxPriceHandler}
            placeholder="Max price"
            className={styles.filterInput}
          />
        </div>
      </div>
      <br />
      <ItemsTable items={filteredItems} />
    </main>
  );
};

export default HomePage;
