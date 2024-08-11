import React from "react";
import { Link } from "react-router-dom";
import { setHighlighText } from "../../util/helpers";

function SearchResult({ data, setOpen, search }) {
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
      <p className="font-[600] text-grey-700 line-clamp-1">
        {setHighlighText(data?.name, search)}
      </p>
    </Link>
  );
}

export default SearchResult;
