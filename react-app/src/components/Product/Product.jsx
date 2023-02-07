import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <div
      id="product"
      onClick={(e) => {
        navigate(`/product/${product.id}`);
      }}
    >
      <img id="thumbnail" src={product.thumbnailUrl} alt="" />
      <p>{product.title}</p>
      <p>{product.description}</p>
    </div>
  );
}
