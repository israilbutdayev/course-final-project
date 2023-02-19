import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import searchSlice from "../../redux/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const search = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    const value = e.target.value;
    dispatch(searchSlice.actions.apply({ [prop]: value }));
  }
  function onSearch(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <form className="flex flex-col gap-4 m-12">
      <div>
        <div className="mb-2 block">
          <Label value="Məhsulun adı" />
        </div>
        <TextInput id="title" onChange={changeHandler} value={search.title} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="brand" value="Məhsulun brendi" />
        </div>
        <TextInput id="brand" onChange={changeHandler} value={search.brand} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Məhsulun kateqoriyası" />
        </div>
        <TextInput
          id="category"
          onChange={changeHandler}
          value={search.category}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Qiymət aralığı" />
        </div>
        <div className="flex justify-start gap-2">
          <TextInput
            id="minPrice"
            onChange={changeHandler}
            value={search.minPrice}
          />
          <TextInput
            id="maxPrice"
            onChange={changeHandler}
            value={search.maxPrice}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Miqdar aralığı" />
        </div>
        <div className="flex justify-start gap-2">
          <TextInput
            id="minStock"
            onChange={changeHandler}
            value={search.minStock}
          />
          <TextInput
            id="maxStock"
            onChange={changeHandler}
            value={search.maxStock}
          />
        </div>
      </div>
      <Button type="submit" onClick={onSearch}>
        Axtar
      </Button>
    </form>
  );
}
