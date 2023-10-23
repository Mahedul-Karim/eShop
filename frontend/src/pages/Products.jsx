import { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import styles from "../util/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../util/data";
import { useSelector } from "react-redux";

function Products() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const { product } = useSelector((state) => state.product);

  const categoryData = searchParams.get("category");

  useEffect(() => {
    if (categoryData === null) {
      const sortedData =product;
        // product && product.sort((a, b) => a.sold_out - b.sold_out);
      setData(sortedData);
    } else {
      const filteredData =
        product &&
        product.filter((product) => product.category === categoryData);
      setData(filteredData);
    }
  }, [categoryData,product]);

  return (
    <>
      <div>
        <Header activePage={3} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Products;
