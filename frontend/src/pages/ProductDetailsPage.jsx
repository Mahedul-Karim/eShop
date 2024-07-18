import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductDetails from "../components/Products/ProductDetails";
import { useHttp } from "../components/hooks/useHttp";
import toast from "react-hot-toast";
import Loader from "../util/Loader";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import Container from "../util/Container";

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
    <Container>
      {isLoading ? <div className="h-screen w-full flex items-center justify-center"><Loader /></div> : <ProductDetails data={data} />}
      {data && <SuggestedProduct data={data} />}
    </Container>
  );
};

export default ProductDetailsPage;
