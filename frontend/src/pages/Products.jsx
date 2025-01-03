import { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../util/Container";
import Filter from "../components/ui/action/Filter";
import useSearch from "../components/hooks/useSearch";
import Loader from "../util/Loader";
import { AiFillFilter } from "react-icons/ai";
import Pagination from "../components/ui/pagination/Pagination";

function Products() {
  const {
    searchText,
    searchData,
    loading,
    handleSearch,
    setSearchText,
    catValue,
    setCatValue,
    ratingValue,
    setRatingValue,
    totalItem,
    error,
    maxValue,
    minValue,
    setMaxValue,
    setMinValue,
  } = useSearch();

  const [searchParams] = useSearchParams();

  const activePage = +searchParams.get("page") || 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(searchText, "filter", activePage);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText, catValue, ratingValue, activePage, maxValue, minValue]);

  return (
    <>
      <Container styles={"py-12"}>
        <br />
        <br />

        <div className="grid md:grid-cols-[0.3fr_1fr] gap-6">
          <div className="py-4 order-3 md:order-1 px-6 flex flex-col gap-4 bg-white rounded-md h-[630px] border-[1px] border-solid border-border">
            <Filter
              searchText={searchText}
              handleSearch={handleSearch}
              setSearchText={setSearchText}
              catValue={catValue}
              setCatValue={setCatValue}
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              minValue={minValue}
              setMinValue={setMinValue}
            />
          </div>
          {loading ? (
            <div className="w-full h-screen order-1 md:order-2">
              <Loader />
            </div>
          ) : (
            <>
              {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 overflow-hidden order-1 md:order-2"> */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-hidden order-1 md:order-2 h-max">
                {!loading &&
                  !error &&
                  searchData &&
                  searchData.map((dt) => (
                    <ProductCard data={dt} key={dt._id} />
                  ))}
                {(error || searchData.length === 0) && (
                  <div className="flex items-center justify-center w-full col-span-full h-screen">
                    <img src="/assets/images.png" alt="No products" />
                  </div>
                )}
              </div>
            </>
          )}
          {searchData?.length < 10 && activePage === 1 ? null : (
            <Pagination totalItem={totalItem} />
          )}
        </div>
      </Container>
    </>
  );
}
export default Products;
