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
    totalItem
  } = useSearch();

  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const activePage = +searchParams.get("page") || 1;

  useEffect(() => {
    handleSearch(searchText, "filter",activePage);
  }, [searchText, catValue, ratingValue,activePage]);

  return (
    <>
      <Container>
        <Header activePage={3} />
        <br />
        <br />
        <div className="flex justify-end relative md:hidden">
          <button className="block" onClick={() => setOpen((prev) => !prev)}>
            <AiFillFilter size={30} />
          </button>
          {open && (
            <div className="absolute top-[27px] right-0 bg-white shadow-lg p-2 w-max z-10">
              <Filter
                searchText={searchText}
                handleSearch={handleSearch}
                setSearchText={setSearchText}
                catValue={catValue}
                setCatValue={setCatValue}
                ratingValue={ratingValue}
                setRatingValue={setRatingValue}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
          <div className="hidden p-3 md:flex flex-col gap-4">
            <Filter
              searchText={searchText}
              handleSearch={handleSearch}
              setSearchText={setSearchText}
              catValue={catValue}
              setCatValue={setCatValue}
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
            />
          </div>
          {loading ? (
            <div className="w-full h-screen">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-hidden">
                {!loading &&
                  searchData &&
                  searchData.map((dt) => (
                    <ProductCard data={dt} key={dt._id} />
                  ))}
              </div>
            </>
          )}
          <Pagination totalItem={totalItem}/>
        </div>
        <Footer />
      </Container>
    </>
  );
}
export default Products;
