import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import styles from "../util/style";

import { useSelector } from "react-redux";

function BestSelling() {
  const { product } = useSelector((state) => state.product);

  const productData = product ? [...product] : [];

  const sortedProduct =
    productData && productData.sort((a, b) => b.sold_out - a.sold_out);

  return (
    <>
      <div>
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {sortedProduct &&
              sortedProduct.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default BestSelling;
