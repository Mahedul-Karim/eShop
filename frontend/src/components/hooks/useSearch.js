import React, { useReducer, useState } from "react";
import { BASE_URL } from "../../util/base";

const initialState = {
  searchText: "",
  searchData: [],
  loading: false,
  catValue: "",
  ratingValue: [0],
  totalItem: 0,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchText: action.payload,
      };
    case "DATA":
      return {
        ...state,
        searchData: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CATEGORY":
      return {
        ...state,
        catValue: action.payload,
      };
    case "RATING":
      return {
        ...state,
        ratingValue: action.payload,
      };
    case "ITEM":
      return {
        ...state,
        totalItem: action.payload,
      };
    default:
      return state;
  }
};

function useSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearchText = (e) => {
    dispatch({ type: "SEARCH", payload: e });
  };

  const handleSearch = async function (e, type = "search", page) {
    setSearchText(e);

    let url;
    let rating =
      state.ratingValue.length > 1
        ? `ratings[eq]=${Math.max(...state.ratingValue)}`
        : `ratings[gte]=${state.ratingValue[0]}`;

    if (state.catValue && state.catValue !== "All") {
      url = `${BASE_URL}/product/search?keyword=${e}&category=${state.catValue}&${rating}&page=${page}`;
    } else {
      url = `${BASE_URL}/product/search?keyword=${e}&${rating}&page=${page}`;
    }

    if (type === "search") {
      url = `${BASE_URL}/product/search?keyword=${e}`;
    }

    if (type === "search" && !e) {
      return;
    }
    try {
      dispatch({ type: "LOADING", payload: true });
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "DATA", payload: data.products });
      dispatch({ type: "ITEM", payload: data.total });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  };
  return {
    searchText: state.searchText,
    searchData: state.searchData,
    loading: state.loading,
    handleSearch,
    setSearchText,
    catValue: state.catValue,
    setCatValue: (val) => dispatch({ type: "CATEGORY", payload: val }),
    ratingValue: state.ratingValue,
    setRatingValue: (val) => dispatch({ type: "RATING", payload: val }),
    totalItem: state.totalItem,
  };
}

export default useSearch;
