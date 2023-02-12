import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { searchSlice } from "../../redux/store";
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
      <Button type="submit" onClick={onSearch}>
        Axtar
      </Button>
    </form>
  );
}
