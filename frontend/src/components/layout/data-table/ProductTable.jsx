import React, { useState } from "react";
import Table from "./Table";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

import ConfirmationModal from "../../ui/modal/ConfirmationModal";

let productName = "";

const ProductTable = ({ product = [], isSeller, handleDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {product.length > 0 ? (
        <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
          <Table
            extraStyles="hidden sm:grid border-b border-solid font-semibold bg-gray-100"
            columns={
              "sm:grid-cols-[0.2fr_0.6fr_0.2fr_0.2fr_0.2fr_0.1fr] md:grid-cols-[0.2fr_0.8fr_0.1fr_0.1fr_0.1fr_0.1fr]"
            }
          >
            <div></div>
            <div>Name</div>
            <div>Stock</div>
            <div>Sold</div>
            <div>Total</div>
            <div></div>
          </Table>
          {product.map((product, id) => {
            return (
              <Table
                extraStyles="border-b border-solid items-center"
                key={product._id}
                columns={
                  "sm:grid-cols-[0.2fr_0.6fr_0.2fr_0.2fr_0.2fr_0.1fr] md:grid-cols-[0.2fr_0.8fr_0.1fr_0.1fr_0.1fr_0.1fr]"
                }
              >
                <div className="flex items-center gap-4 sm:gap-0 sm:justify-center">
                  <img
                    src={product?.images?.[0]?.url}
                    alt=""
                    className="w-[60px] h-[60px] object-cover"
                  />
                  <p className="font-medium text-sm line-clamp-2 inline-block sm:hidden">
                    {product?.name}
                  </p>
                </div>
                <div className="hidden sm:inline-block font-medium w-[95%] line-clamp-2 text-xs lg:text-sm">
                  {product?.name}
                </div>
                <div className="font-medium my-6 sm:my-0 flex items-center gap-6">
                  <p className="font-medium text-sm inline-block sm:hidden">
                    Stock:
                  </p>
                  {product?.stock}
                </div>
                <div className="font-medium flex items-center gap-6">
                  <p className="font-medium text-sm inline-block sm:hidden">
                    Sold:
                  </p>
                  {product?.sold_out}
                </div>
                <div className="font-medium flex items-center gap-6 sm:my-0 my-6">
                  <p className="font-medium text-sm inline-block sm:hidden">
                    Price:
                  </p>
                  ${product?.price}
                </div>
                {isSeller ? (
                  <button
                    onClick={() => {
                      setOpen(true);
                      productName = product._id;
                    }}
                    className="mt-2 md:mt-0 flex justify-end md:justify-normal"
                  >
                    <FaTrash className="text-[20px] sm:text-[16px]" />
                  </button>
                ) : (
                  <Link to={`/product/${product.name}`}>
                    <AiOutlineEye className="text-[20px] sm:text-[16px]" />
                  </Link>
                )}
              </Table>
            );
          })}
          <ConfirmationModal
            open={open}
            setOpen={setOpen}
            id={productName}
            confirmationFunction={() => handleDelete(productName)}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center text-lg h-full">
          <p>
            {isSeller
              ? "You have not create any product!"
              : "No Products to show "}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductTable;
