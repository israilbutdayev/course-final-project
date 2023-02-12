import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    // <div
    //   id="product"
    //   onClick={(e) => {
    //     navigate(`/product/${product.id}`);
    //   }}
    // >
    //   <img id="thumbnail" src={product.thumbnailUrl} alt="" />
    //   <p>{product.title}</p>
    //   <p>{product.description}</p>
    // </div>
    <React.Fragment>
      <div className="max-w-sm">
        <Card
          imgSrc={product.thumbnailUrl}
          onClick={(e) => {
            navigate(`/product/${product.id}`);
          }}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {product.brand}
          </p>
        </Card>
      </div>
    </React.Fragment>
  );
}
