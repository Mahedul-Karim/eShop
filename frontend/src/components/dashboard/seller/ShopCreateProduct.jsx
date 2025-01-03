import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { categoriesData } from "../../../util/data";
import { BASE_URL } from "../../../util/base";
import { productActions } from "../../../store/productSlice";
import { FaTrash } from "react-icons/fa";

const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isProductLoading } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error, warning } = useToast();

  const [images, setImages] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  const handleImageChange = (e) => {
    if (images.length === 4) {
      warning("Maximum image reached!");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = function () {
      setImages((prev) => [...prev, fileReader.result]);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 4 || images.length > 4) {
      warning("4 Images are required");
      return;
    }

    try {
      dispatch(productActions.productRequest());
      const res = await fetch(`${BASE_URL}/product/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          tags,
          price,
          stock,
          shopId: seller._id,
          images,
        }),
      });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message);
      }
      dispatch(productActions.productRequestSuccess(data.product));
      navigate("/seller/dashboard");
      success("Product created successfully");
    } catch (err) {
      error(err.message);
      dispatch(productActions.productRequestFailed());
    }
  };

  const handleImageDelete = (id) => {
    setImages((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div className="rounded-[4px] w-[90%] mx-auto my-8">
      <h5 className="text-[24px] 400px:text-[30px] font-Poppins text-center">
        Create Product
      </h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>(4-images)
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i, index) => (
                <div key={index} className="relative">
                  <img
                    src={i}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                  <button
                    type="button"
                    className="absolute top-4 right-4 bg-white p-1 rounded-md"
                    onClick={handleImageDelete.bind(null, index)}
                  >
                    <FaTrash className="text-secondary" />
                  </button>
                </div>
              ))}
          </div>
          <br />
          <div>
            <button
              type="submit"
              className="mt-2 appearance-none text-center block w-full px-3 h-[35px] border border-border rounded-[3px] placeholder-gray-400 focus:outline-none sm:text-sm text-white bg-primary disabled:bg-primary/[0.4]"
              disabled={isProductLoading}
            >
              {isProductLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopCreateProduct;
