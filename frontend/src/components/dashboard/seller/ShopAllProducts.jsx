import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../../store/productSlice";
import { useToast } from "../../hooks/useToast";
import { BASE_URL } from "../../../util/base";
import Loading from "../common/Loading";
import ProductTable from "../../layout/data-table/ProductTable";

const ShopAllProducts = () => {
  const { product, isProductLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const { success, error } = useToast();

  useEffect(() => {
    const getProducts = async function () {
      try {
        dispatch(productActions.productRequest());
        const res = await fetch(`${BASE_URL}/product/${seller._id}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.message);
        }

        dispatch(productActions.allProducts(data.product));
      } catch (err) {
        error(err.message);
      }
    };

    getProducts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      dispatch(productActions.productRequest());
      const res = await fetch(`${BASE_URL}/product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message);
      }

      dispatch(productActions.deleteProducts(id));
      success(data.message);
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <>
      {isProductLoading ? (
        <Loading />
      ) : (
        <ProductTable isSeller product={product} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default ShopAllProducts;
