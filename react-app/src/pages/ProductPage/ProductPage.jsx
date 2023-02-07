import React from "react";
import { useGetQuery } from "../../redux/store";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const params = useParams();
  const { isLoading, data } = useGetQuery(params.id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const product = data?.products?.[0];
  if (!product) {
    return <div>Məhsul tapılmadı!!!</div>;
  }
  return (
    <div>
      <div>Title: {product.title}</div>
      <div>
        {product.imageUrls.map((i, ind) => {
          return <img key={ind} src={i} height="100px" />;
        })}
      </div>
      <div>Brand: {product.brand}</div>
      <div>Category: {product.catergory}</div>
      <div>Price: {product.price}</div>
      <div>Description: {product.description}</div>
    </div>
  );
}
