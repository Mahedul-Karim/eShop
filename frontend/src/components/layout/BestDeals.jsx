import styles from "../../util/style";
import ProductCard from "../Products/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
 
  const { product } = useSelector((state) => state.product);

  
  const productData=product ? [...product] : [];

  const sortedProduct=productData && productData.sort((a,b)=>b.sold_out - a.sold_out);

  
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {product && product.length !== 0 && (
            <>
              {sortedProduct &&
                sortedProduct.slice(0,5).map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
