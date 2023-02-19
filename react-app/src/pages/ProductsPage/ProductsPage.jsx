import React, { useEffect, useState } from "react";
import {
  useAddMutation,
  useDeleteMutation,
  useLazyGetQuery,
} from "../../redux/store";
import { Table, TextInput } from "flowbite-react";

function Products() {
  const [deleter] = useDeleteMutation();
  const [getter, response] = useLazyGetQuery();
  const { isLoading, data } = response;
  const [product, setProduct] = useState({
    thumbnail: "",
    title: "",
    brand: "",
    category: "",
    color: "",
    price: "",
    stock: "",
    description: "",
  });
  useEffect(() => {
    setTimeout(() => {
      getter({
        method: "POST",
      });
    }, 500);
  }, [getter]);
  const [adder] = useAddMutation();
  const onChange = (e) => {
    const prop = e.target.id;
    if (prop === "price" || prop === "stock") {
      setProduct((prod) => ({ ...prod, [prop]: Number(e.target.value) }));
    } else {
      setProduct((prod) => ({ ...prod, [prop]: e.target.value }));
    }
  };
  const onAdd = () => {
    adder({ product });
  };
  const onDelete = (id) => {
    deleter({ id });
    getter({
      method: "POST",
    });
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Məhsulun Şəkli</Table.HeadCell>
          <Table.HeadCell>Məhsulun adı</Table.HeadCell>
          <Table.HeadCell>Brend</Table.HeadCell>
          <Table.HeadCell>Kateqoriya</Table.HeadCell>
          <Table.HeadCell>Rəng</Table.HeadCell>
          <Table.HeadCell>Qiymət</Table.HeadCell>
          <Table.HeadCell>Miqdar</Table.HeadCell>
          <Table.HeadCell>Ətraflı məlumat</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Düzəliş et</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.products?.map((product) => {
            return (
              <Table.Row
                key={product.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <img
                    src={"static/images/" + product.thumbnailUrl}
                    alt={product.title}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.color}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell className="text-blue-700 underline underline-offset-2">
                  <button onClick={() => onDelete(product.id)}>
                    Məhsulu sil
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <input
                id="thumbnail"
                className="block w-36 mb-0 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.addEventListener("load", (event) => {
                    setProduct((product) => ({
                      ...product,
                      thumbnail: event.target.result,
                    }));
                  });
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <TextInput
                id="title"
                onChange={onChange}
                value={product.title}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="brand"
                onChange={onChange}
                value={product.brand}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="category"
                onChange={onChange}
                value={product.category}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="color"
                onChange={onChange}
                value={product.color}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="price"
                onChange={onChange}
                value={product.price}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="stock"
                onChange={onChange}
                value={product.stock}
              ></TextInput>
            </Table.Cell>
            <Table.Cell>
              <TextInput
                id="description"
                onChange={onChange}
                value={product.description}
              ></TextInput>
            </Table.Cell>
            <Table.Cell className="text-blue-700 underline underline-offset-2">
              <button onClick={onAdd}>Məhsulu əlavə et</button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default Products;
