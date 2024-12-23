import React from "react";
import { useSearchParams } from "react-router-dom";

const ITEM_PER_PAGE = 10;

function Pagination({ totalItem,className }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = +searchParams.get("page") || 1;
  const totalPage = Math.ceil(totalItem / ITEM_PER_PAGE);

  let listTag = [];
  let beforePage = activePage - 1;
  let afterPage = activePage + 1;

  if (activePage === totalPage && totalPage > 10) {
    beforePage = beforePage - 2;
  } else if (activePage === totalPage - 1 && totalPage > 10) {
    beforePage = beforePage - 1;
  }

  if (activePage === 1) {
    afterPage = afterPage + 2;
  } else if (activePage === 2) {
    afterPage = afterPage + 1;
  }

  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPage) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    listTag.push(pageLength);
  }

  const nextPage = (type) => {
    if (type !== "next") {
      return;
    }

    const next = activePage <= totalPage ? activePage + 1 : null;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  const prevPage = (type) => {
    if (type !== "prev") {
      return;
    }

    const prev = activePage === 1 ? activePage : activePage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  const clickPage = (num) => {
    if (!num || num === 0) return;
    searchParams.set("page", num);
    setSearchParams(searchParams);
  };

  return (
    <ul className={`md:col-start-2 flex items-center gap-2 mx-auto order-2 md:order-3`}>
      <li>
        <button
          className={`block p-2 rounded-md ${
            activePage !== 1 && "page_hover"
          } w-[70px] transition-all duration-300 disabled:text-grey-200`}
          disabled={activePage === 1}
          onClick={prevPage.bind(null, "prev")}
        >
          &larr;<span>Prev</span>
        </button>
      </li>
      {activePage >= 3 && (
        <li>
          <button
            className={`p-2 w-[30px] rounded-full page_hover ${
              activePage === 1 && "page_active"
            } transition-all duration-300 block`}
            onClick={clickPage.bind(null, 1)}
          >
            <span>1</span>
          </button>
        </li>
      )}
      {activePage > 3 && (
        <li>
          <button className={`p-2 w-[30px] rounded-md cursor-default  block`}>
            <span>...</span>
          </button>
        </li>
      )}
      {listTag.map((list) => (
        <li key={list}>
          <button
            className={`block p-2 w-[30px] rounded-full page_hover  transition-all duration-300 ${
              activePage === list ? "page_active" : ""
            }`}
            onClick={() => clickPage(list)}
          >
            <span>{list}</span>
          </button>
        </li>
      ))}
      {activePage <= totalPage - 2 && (
        <li>
          <button className={`p-2 w-[30px] rounded-md cursor-default  block`}>
            <span>...</span>
          </button>
        </li>
      )}
      {activePage <= totalPage - 2 && (
        <li>
          <button className="block p-2 w-[30px] rounded-full page_hover transition-all duration-300">
            <span>{totalPage}</span>
          </button>
        </li>
      )}

      <li>
        <button
          className={`block p-2 rounded-md ${
            activePage !== totalPage && "page_hover"
          } w-[70px] transition-all duration-300 disabled:text-grey-200`}
          disabled={activePage === totalPage}
          onClick={nextPage.bind(null, "next")}
        >
          <span>Next</span>&rarr;
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
