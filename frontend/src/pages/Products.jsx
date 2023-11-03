import { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../util/Container";
import Filter from "../components/ui/action/Filter";

function Products() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const { product } = useSelector((state) => state.product);

  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData === null) {
      const sortedData = product;
      // product && product.sort((a, b) => a.sold_out - b.sold_out);
      setData(sortedData);
    } else {
      const filteredData =
        product &&
        product.filter((product) => product.category === categoryData);
      setData(filteredData);
    }
  }, [categoryData, product]);

  return (
    <>
      <Container>
        <Header activePage={3} />
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
          <div className="hidden p-3 md:flex flex-col gap-4">
          <Filter />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[1200px] overflow-hidden">
            {data && data.map((dt) => <ProductCard data={dt} key={dt._id} />)}
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
}
export default Products;
