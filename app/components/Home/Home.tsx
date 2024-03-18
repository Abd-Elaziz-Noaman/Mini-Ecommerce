"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { FaShoppingCart } from "react-icons/fa";

import styles from "./Home.module.css";
import ItemsTable from "../ItemsTable/ItemsTable";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceFilterMatch = priceFilter === null || item.price === priceFilter;
    const priceRangeMatch =
      (minPrice === null || item.price >= minPrice) &&
      (maxPrice === null || item.price <= maxPrice);
    return nameMatch && priceFilterMatch && priceRangeMatch;
  });
  console.log("🚀 ~ filteredItems ~ filteredItems:", filteredItems);

  return (
    <main className={styles.main}>
      <div className={styles.cartBadge}>
        <FaShoppingCart size={50} />
        <p className={styles.cartNumber}>4</p>
      </div>
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
