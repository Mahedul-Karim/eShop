import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import styles from "../../util/style";
import Loader from "../../util/Loader";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../util/base";
import { sellerActions } from "../../store/sellerSlice";
import { useHttp } from "../hooks/useHttp";
import toast from "react-hot-toast";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});

  const [isLoading, fetchData, error] = useHttp();

  const { shopId } = useParams();

  const { product } = useSelector(state=>state.product);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const getShopInfo = async function () {
      const shopData = await fetchData(`shop/${shopId}`);

      if (error) {
        return toast.error(error);
      }

      setData(shopData.shop);
    };
    getShopInfo()
  }, [error,fetchData,shopId]);

  const handleLogout = async function () {
    const res = await fetch(`${BASE_URL}/shop/shop-logout`);
    const data = await res.json();
    localStorage.removeItem("seller");
    dispatch(sellerActions.sellerLogOut());

    navigate("/");
  };

  const sellerProduct =
    product && product.filter((p) => p.shopId === data._id);

   const totalReviews=sellerProduct.reduce((a,p)=>a+p.reviews.length,0);

  const totalRatings=sellerProduct.reduce((a,p)=>a+(p.ratings ? p.ratings : 0),0);
  
  const avgRating = totalRatings / totalReviews || 0;
  
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${data.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description || "A dummy description"}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{sellerProduct.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{avgRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={handleLogout}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
