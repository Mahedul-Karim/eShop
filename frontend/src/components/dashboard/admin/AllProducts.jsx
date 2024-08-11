import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../util/Loader";
import { useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Loading from "../common/Loading";
import ProductTable from "../../layout/data-table/ProductTable";

const AllProducts = () => {
  const [data, setData] = useState([]);

  const [isLoading, fetchData] = useHttp();

  useEffect(() => {
    const productData = async function () {
      const productData = await fetchData("product");
      setData(productData.products);
    };
    productData();
  }, []);

  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ProductTable product={data} />
      )}
    </>
  );
};

export default AllProducts;
