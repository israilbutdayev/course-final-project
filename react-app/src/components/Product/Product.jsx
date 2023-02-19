import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="max-w-sm">
        <Card
          imgSrc={"static/images/" + product.thumbnailUrl}
          onClick={(e) => {
            navigate(`/product/${product.id}`);
          }}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Məhsulun adı: {product.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Məhsulun brendi: {product.brand}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Məhsulun kateqoriyası: {product.category}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Məhsulun qiyməti: {product.price} $
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Məhsulun miqdarı: {product.stock}
          </p>
        </Card>
      </div>
    </React.Fragment>
  );
}
