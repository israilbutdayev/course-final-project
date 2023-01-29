import React from "react";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../redux/store";
import store from "../../redux/store";
import Product from "../Product/Product";
import "./Products.css";
store.dispatch(getAllProducts);

export default function Products() {
  const products = useSelector((state) => state);
  return (
    <div>
      <div id="pagination"></div>
      <div id="products">
        {products.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
