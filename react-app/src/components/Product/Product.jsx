import React from "react";
import "./Product.css";

export default function Product({ product }) {
  return (
    <div id="product">
      <img id="thumbnail" src={product.thumbnail} alt="" />
      <p>{product.title}</p>
      <p>{product.description}</p>
    </div>
  );
}
