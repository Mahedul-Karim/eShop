import React from "react";
import { Link } from "react-router-dom";

function SearchResult({ data, setOpen }) {
  return (
    <Link
      className="flex items-center py-2"
      to={`/product/${data?.name}`}
      onClick={setOpen.bind(null, false)}
    >
      <img
        src={data?.images[0]?.url}
        alt="search text"
        className="w-[60px] h-[60px]"
      />
      <p className="font-[600] text-grey-700 line-clamp-1">{data?.name}</p>
    </Link>
  );
}

export default SearchResult;
