import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

import { Link } from "react-router-dom";
import Table from "../../layout/data-table/Table";
import { formatDate } from "../../../util/helpers";
import ConfirmationModal from "../../ui/modal/ConfirmationModal";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { adminSeller } = useSelector((state) => state.seller);
  const { token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    console.log(userId);
  };

  return (
    <div className="pt-5">
      <div className="">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div>
          {adminSeller?.length > 0 ? (
            <div className="border border-solid border-gray-200 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto">
              <Table
                extraStyles="hidden sm:grid border-b border-solid font-semibold bg-gray-100"
                columns={"grid-cols-[0.3fr_0.5fr_0.4fr_0.2fr_0.1fr]"}
              >
                <div>Name</div>
                <div>Email</div>
                <div>Joined At</div>
                <div>Shop Preview</div>
                <div />
              </Table>
              {adminSeller.map((seller, id) => {
                return (
                  <Table
                    extraStyles="border-b border-solid items-center"
                    key={seller._id}
                    columns={"sm:grid-cols-[0.3fr_0.5fr_0.4fr_0.2fr_0.1fr]"}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block sm:hidden">
                        Name:
                      </p>
                      <p>{seller?.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block sm:hidden">
                        Email:
                      </p>
                      {seller?.email}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm inline-block sm:hidden">
                        Joined At:
                      </p>
                      {formatDate(seller?.createdAt)}
                    </div>
                    <Link
                      to={`/shop/preview/${seller._id}`}
                      className="flex items-center justify-end sm:justify-normal"
                    >
                      <button>
                        <AiOutlineEye size={20} />
                      </button>
                    </Link>
                    <button
                      onClick={() => setUserId(seller._id) || setOpen(true)}
                      className="flex items-center justify-end sm:justify-normal"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </Table>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-lg h-full">
              <p>No sellers were found!</p>
            </div>
          )}
        </div>
        {
          <ConfirmationModal
            open={open}
            setOpen={setOpen}
            confirmationFunction={handleDelete}
          />
        }
      </div>
    </div>
  );
};

export default AllSellers;
