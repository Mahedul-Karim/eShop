import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
import { useSelector } from "react-redux";

function SearchBar({ width }) {
  const { product } = useSelector((state) => state.product);
  const [searchText, setSearchText] = useState();
  const [searchData, setSearchData] = useState();
  const handleSearch = function (e) {
    setSearchText(e.target.value);

    const filteredProduct =
      product &&
      product.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    setSearchData(filteredProduct);
  };
  return (
    <div
      className={`border-[1px] border-solid border-grey-200 flex items-center w-[${width}] p-1 rounded-full justify-around relative`}
    >
      <input
        type="text"
        placeholder="Search product"
        className="px-2 w-[80%]"
        value={searchText}
        onChange={handleSearch}
      />
      <AiOutlineSearch size={30} className="text-grey-700 cursor-pointer" />
      {searchText && searchData && searchData?.length !== 0 ? (
        <div
          className="absolute w-full p-4 top-10 z-[9999] rounded-md bg-white shadow-lg"
          id="search"
        >
          {searchData &&
            searchData?.map((data, i) => <SearchResult data={data} key={i} />)}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
