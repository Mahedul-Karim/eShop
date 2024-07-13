import React, { useReducer, useState } from "react";
import { BASE_URL } from "../../util/base";

const initialState = {
  searchText: "",
  searchData: [],
  loading: false,
  catValue: "",
  ratingValue: [],
  totalItem: 0,
  error: false,
  errorMessage: "",
  maxValue: 2000,
  minValue: 0,
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
        error: false,
        errorMessage: "",
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
    case "ERROR":
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        searchData: [],
      };
    case "MAX_VALUE":
      return {
        ...state,
        maxValue: action.payload,
      };
    case "MIN_VALUE":
      return {
        ...state,
        minValue: action.payload,
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

  const setCatValue = (val) => {
    dispatch({ type: "CATEGORY", payload: val });
  };

  const setRatingValue = (val) => {
    dispatch({ type: "RATING", payload: val });
  };

  const setMaxValue=(val)=>{
    dispatch({type:"MAX_VALUE",payload:val})
  }

  const setMinValue=(val)=>{
    dispatch({ type:"MIN_VALUE",payload:val })
  }

  const handleSearch = async function (e, type = "search", page) {
    setSearchText(e);
    let url = `${BASE_URL}/product/search`;

    try {
      dispatch({ type: "LOADING", payload: true });
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchText: state.searchText,
          catValue: state.catValue,
          ratingValue: state.ratingValue,
          page,
          maxValue:state.maxValue,
          minValue:state.minValue
        }),
      });
      const data = await res.json();

      if (data.status === "failed") {
        console.log(data.status);
        throw new Error(data.message);
      }

      dispatch({ type: "DATA", payload: data.products });
      dispatch({ type: "ITEM", payload: data.total });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "ERROR", payload: err.message });
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
    setCatValue,
    ratingValue: state.ratingValue,
    setRatingValue,
    totalItem: state.totalItem,
    error: state.error,
    errorMessage: state.errorMessage,
    maxValue:state.maxValue,
    minValue:state.minValue,
    setMaxValue,
    setMinValue
  };
}

export default useSearch;
