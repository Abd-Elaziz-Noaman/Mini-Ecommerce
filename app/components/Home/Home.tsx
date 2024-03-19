"use client";

import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import PuffLoader from "react-spinners/PuffLoader";
import { toast } from "react-toastify";

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
  const { cartItems }: any = useCartStore();
  const [fetchedItems, setFetchedItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/itemsData.json");
      const jsonData = await response.json();
      setFetchedItems(jsonData);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      toast.error("Error in fetching Data");
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

  const sortHandler = useCallback(
    (sortField: string) => {
      if (sortBy === sortField) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(sortField);
        setSortOrder("asc");
      }
    },
    [sortBy, sortOrder]
  );

  // filter items according to filter inputs
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

  // sort items according to sorting order
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortBy === "name") {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortBy === "price") {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    } else {
      return 0;
    }
  });

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
          <p className={styles.cartNumber}>{cartItems.length}</p>
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
      <ItemsTable
        items={sortedItems}
        sortHandler={sortHandler}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </main>
  );
};

export default HomePage;
