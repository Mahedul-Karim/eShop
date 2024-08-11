import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchResult from "./SearchResult";
import Loader from "../../util/Loader";
import useSearch from "../hooks/useSearch";

function SearchBar({ width, extraClass, setOpen }) {
  const [search, setSearch] = useState("");

  const { searchData, loading, handleSearch } = useSearch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-solid border-grey-200 flex items-center justify-around p-1 mt-10 rounded-full">
        <input
          type="text"
          placeholder="Search product"
          className="px-2 w-[80%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch size={30} className="text-grey-700 cursor-pointer" />
      </div>
      <div
        className="w-full  rounded-md bg-white"
        id="search"
      >
        {loading && <Loader />}
        {!loading &&
          searchData.length !== 0 &&
          search &&
          searchData?.map((data, i) => (
            <SearchResult
              data={data}
              key={i}
              setOpen={setOpen}
              search={search}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
