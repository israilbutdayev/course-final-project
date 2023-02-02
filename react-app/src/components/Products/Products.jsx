import React from "react";
import { useSelector } from "react-redux";
import { getProductsThunk } from "../../redux/store";
import store from "../../redux/store";
import Product from "../Product/Product";
import "./Products.css";
import { useState } from "react";
import { useMemo } from "react";
store.dispatch(getProductsThunk());

export default function Products() {
  const products = useSelector((state) => state.product);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const pages = useMemo(() => {
    return Math.ceil(products.products.length / count);
  }, [count, products.products.length]);
  const pageProducts = useMemo(() => {
    const startIndex = (page - 1) * count;
    const endIndex = startIndex + count;
    return [...products.products]
      .sort((a, b) => a.id - b.id)
      .slice(startIndex, endIndex);
  }, [count, page, products]);
  const countHandler = (e) => {
    const previous = count;
    const next = Number(e.target.value);
    const result = Math.ceil((previous * (page - 1) + 1) / next);
    setPage(result);
    setCount(Number(e.target.value));
  };
  const pageHandler = (e) => {
    setPage(Number(e.target.value));
  };
  function searchHandler(e) {
    e.preventDefault();
  }
  return (
    <div>
      <div id="pagination">
        <div id="page">
          <span>Səhifə</span>
          <select onChange={pageHandler} value={`${page}`}>
            {[...Array(pages).keys()].map((i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div id="count">
          <span>Məhsulların sayı</span>
          <select name="count" id="count" onChange={countHandler} value={count}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div>
          <input
            id="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button onClick={searchHandler}>Axtar</button>
        </div>
      </div>
      <div id="products">
        {pageProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
