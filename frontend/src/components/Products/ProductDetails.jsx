import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { wishlistAction } from "../../store/wishlistSlice";
import { useToast } from '../hooks/useToast'
import { useHttp } from "../hooks/useHttp";
import BreadCrumb from "./details/BreadCrumb";
import Gallery from "./details/Gallery";
import Details from "./details/Details";
import Description from "./details/Description";
import Reviews from "./details/Reviews";



const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const [_, fetchData] = useHttp();

  const { success,error } = useToast();

  const navigate = useNavigate();

  const handleMessageSubmit = async function () {
    if (!user) {
      error("Login first to start conversation with the seller!");
      return;
    }
    const groupTitle = user._id + data._id;
    const userId = user._id;
    const participentId = data.shop._id;

    try {
      const convData = await fetchData(
        `conversation`,
        "POST",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        JSON.stringify({ groupTitle, userId, participentId })
      );

      navigate(`/inbox?conversation=${convData.conversation._id}`);
    } catch (err) {
      error(err.message);
    }
  };

  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((w) => w._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const handleCardAdd = function (product) {
    dispatch(cartAction.addToCart({ ...product, quantity: count }));
    success("Product added to cart");
  };

  const addToWishlist = function (product) {
    setClick(true);
    dispatch(wishlistAction.addTowishlist(product));
  };

  const removeFromWishlist = function (id) {
    setClick(false);
    dispatch(wishlistAction.removewishlistItem(id));
  };


  return (
    <div className="my-6">
      <BreadCrumb category={data?.category} name={data?.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
        <Gallery images={data?.images} />
        <Details
          click={click}
          setCount={setCount}
          data={data}
          avgRating={data?.ratings}
          handleMessageSubmit={handleMessageSubmit}
          count={count}
          removeFromWishlist={removeFromWishlist}
          addToWishlist={addToWishlist}
          handleCardAdd={handleCardAdd}
        />
      </div>
      <Description description={data?.description} />
      <Reviews avgRating={data?.ratings} reviews={data?.reviews}/>
    </div>
    
  );
};

export default ProductDetails;
