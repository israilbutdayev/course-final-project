import React from "react";
import { useGetQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import { Label, Carousel } from "flowbite-react";

export default function ProductPage() {
  const params = useParams();
  const { isLoading, data } = useGetQuery({ id: params.id });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const product = data?.products?.[0];
  if (!product) {
    return <div>Məhsul tapılmadı!!!</div>;
  }
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 m-8">
        <div className="h-96 sm:h-96 xl:h-96 2xl:h-96">
          <Carousel slideInterval={5000}>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt="" />
            ))}
          </Carousel>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun adı" />
          </div>
          <div>{product.title}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun brendi" />
          </div>
          <div>{product.brand}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun kateqoriyası" />
          </div>
          <div>{product.category}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun Rəngi" />
          </div>
          <div>{product.color}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun haqqında" />
          </div>
          <div>{product.description}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun qiyməti" />
          </div>
          <div>{product.price}</div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Məhsulun miqdarı" />
          </div>
          <div>{product.stock}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
