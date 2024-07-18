import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cartSlice";
import { wishlistAction } from "../../store/wishlistSlice";
import toast from "react-hot-toast";
import { useHttp } from "../hooks/useHttp";
import Ratings from "../../util/Ratings";
import BreadCrumb from "./details/BreadCrumb";
import Gallery from "./details/Gallery";
import Details from "./details/Details";

const DUMMY_IMAGE = [
  {
    url: "https://plus.unsplash.com/premium_photo-1664201890729-a9653a3592cb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlfGVufDB8fDB8fHww",
    public_id: "1",
  },
  {
    url: "https://media.istockphoto.com/id/1305305520/photo/mockup-of-isolated-mobile-phone-with-home-screen-templates.webp?s=170667a&w=0&k=20&c=NX_KqOAJ8h3zCKX4c_mvt17Ym7yUgqHED_of0FF_9jM=",
    public_id: "2",
  },
  {
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    public_id: "3",
  },
  {
    url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    public_id: "4",
  },
];

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { product } = useSelector((state) => state.product);
  const { user, token } = useSelector((state) => state.auth);

  const [_, fetchData] = useHttp();

  const navigate = useNavigate();

  const handleMessageSubmit = async function () {
    if (!user) {
      toast.error("Login first to start conversation with the seller!");
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
      toast.error(err.message);
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
    toast.success("Product added to cart");
  };

  const addToWishlist = function (product) {
    setClick(true);
    dispatch(wishlistAction.addTowishlist(product));
  };

  const removeFromWishlist = function (id) {
    setClick(false);
    dispatch(wishlistAction.removewishlistItem(id));
  };

  const sellerProduct =
    product && product.filter((p) => p.shopId === data?.shopId);

  const totalReviews = sellerProduct.reduce((a, p) => a + p.reviews.length, 0);

  const totalRatings = sellerProduct.reduce(
    (a, p) => a + (p.ratings ? p.ratings : 0),
    0
  );

  console.log(sellerProduct)

  const avgRating = data?.ratings / data?.reviews?.length || 0;

  return (
    <div className="my-6">
      <BreadCrumb category={data?.category} name={data?.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
        <Gallery images={DUMMY_IMAGE} />
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
      <div className="border border-solid mt-8 px-4 py-6 rounded-md" id="product__details">
        <h4 className="text-lg 400px:text-xl font-semibold ">Product Description</h4>
        <div className="h-[0.8px] bg-[#e5e7eb] w-full my-2"/>
        <p className="400px:text-base text-sm">{data?.description}</p>
      </div>
    </div>
    
  );
};
//bg-slate-100
export default ProductDetails;
