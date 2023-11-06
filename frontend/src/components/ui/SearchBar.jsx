import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
import { useSelector } from "react-redux";
import Loader from "../../util/Loader";
import { BASE_URL } from "../../util/base";
import useSearch from "../hooks/useSearch";

function SearchBar({ width }) {
  
  const { searchText, searchData, loading, handleSearch } = useSearch();
  return (
    <div
      className={`border-[1px] border-solid border-grey-200 flex items-center w-[${width}] p-1 rounded-full justify-around relative`}
    >
      <input
        type="text"
        placeholder="Search product"
        className="px-2 w-[80%]"
        value={searchText}
        onChange={(e)=>handleSearch(e.target.value)}
      />
      <AiOutlineSearch size={30} className="text-grey-700 cursor-pointer" />
      {searchText ? (
        <div
          className="absolute w-full p-4 top-10 z-[9999] rounded-md bg-white shadow-lg"
          id="search"
        >
          {loading && <Loader />}
          {!loading &&
            searchData &&
            searchData?.map((data, i) => <SearchResult data={data} key={i} />)}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
