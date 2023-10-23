import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useHttp } from "../components/hooks/useHttp";
import { toast } from "react-toastify";
import Loader from "../util/Loader";
import SuggestedProduct from "../components/Products/SuggestedProduct";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [data, setData] = useState(null);

  const [isLoading, fetchData, error] = useHttp();

  const productName = productId.replace(/-/g, " ");
  
  useEffect(() => {
    const getProduct = async function () {
      try {
        const data = await fetchData(`product/single/${productName}`);

        setData(data.product);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getProduct();
  }, [productName, fetchData, error]);

  return (
    <div>
      <Header />
      {isLoading ? <Loader /> : <ProductDetails data={data} />}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
