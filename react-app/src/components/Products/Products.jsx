import React from "react";
import { useSelector } from "react-redux";
import { useSearchQuery } from "../../redux/store";
import Product from "../Product/Product";
import { useState } from "react";
import { useMemo } from "react";
import { Pagination, Label, Select } from "flowbite-react";
export default function Products() {
  const search = useSelector((store) => store.search);
  const { isLoading: searchIsLoading, data: searchData = [] } =
    useSearchQuery(search);
  const [count, setCount] = useState(9);
  const [page, setPage] = useState(1);
  const pages = useMemo(() => {
    return Math.ceil(searchData?.length / count);
  }, [count, searchData?.length]);
  const pageProducts = useMemo(() => {
    const startIndex = (page - 1) * count;
    const endIndex = startIndex + count;
    return [...searchData]
      .sort((a, b) => a.id - b.id)
      .slice(startIndex, endIndex);
  }, [count, page, searchData]);
  const countHandler = (e) => {
    const previous = count;
    const next = Number(e.target.value);
    const result = Math.ceil((previous * (page - 1) + 1) / next);
    setPage(result);
    setCount(Number(e.target.value));
  };
  const onPageChange = (e) => {
    setPage(e);
  };
  if (searchIsLoading) return <div>Loading...</div>;
  if (!searchData.length)
    return <div>Axtarışınıza uyğun məhsul tapılmadı.</div>;
  return (
    <div>
      <div
        id="pagination"
        className="flex flex-row justify-center items-center my-5"
      >
        <Pagination
          currentPage={page}
          onPageChange={onPageChange}
          showIcons={true}
          totalPages={pages}
        />
        <div id="select" className="flex">
          <div className="mb-2 m-3">
            <Label htmlFor="count" value="Məhsulların sayı" />
          </div>
          <Select
            id="count"
            required={true}
            value={count}
            onChange={countHandler}
            className="p-0 m-0 h-0.5"
          >
            <option value="3">3</option>
            <option value="9">9</option>
            <option value="27">27</option>
            <option value="81">81</option>
          </Select>
        </div>
      </div>
      <div id="products" className="grid grid-cols-3 gap-1 gap-y-8">
        {pageProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
