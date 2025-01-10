import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { BASE_URL } from "../../../util/base";
import Loading from "../common/Loading";
import CouponForm from "./CouponForm";
import Table from "../../layout/data-table/Table";
import { FaTrash } from "react-icons/fa";

const ShopAllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [maxUsage, setMaxUsage] = useState(null);
  const [value, setValue] = useState(null);
  const { seller, sellerToken } = useSelector((state) => state.seller);

  const { success, error } = useToast();

  useEffect(() => {
    const allCoupons = async function () {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/coupon/${seller._id}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.message);
        }

        setCoupouns(data.coupons);
      } catch (err) {
        error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    allCoupons();
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/coupon/${id}`, { method: "DELETE" });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message);
      }

      setCoupouns((prev) => prev.filter((c) => c._id !== id));
      success("Coupon deleted");
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sellerToken}`,
        },
        body: JSON.stringify({
          name,
          maxUsage,
          value,
        }),
      });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message);
      }

      setCoupouns((prev) => [...prev, data.coupon]);
      success("Coupon created successfully");
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full pt-1 mt-10">
          <div className="w-full flex justify-end">
            <div
              className={`bg-primary text-white flex items-center justify-center rounded-md cursor-pointer px-3 400px:px-3 py-2  400px:text-base text-sm`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          {coupouns.length > 0 ? (
            <div className="border border-solid border-gray-200 ml-2 md:ml-8 rounded-md text-xs md:text-sm text-black/[0.87] font-Roboto my-8">
              <Table
                extraStyles="hidden md:grid border-b border-solid font-semibold bg-gray-100"
                columns={"grid-cols-[0.5fr_0.6fr_0.3fr_0.3fr]"}
              >
                <div>Id</div>
                <div>Coupon</div>
                <div>Value</div>
                <div></div>
              </Table>
              {coupouns.map((coupon, id) => {
                return (
                  <Table
                    extraStyles=" border-b border-solid items-center"
                    key={coupouns._id}
                    columns={
                      "grid-cols-1 md:grid-cols-[0.5fr_0.6fr_0.3fr_0.3fr]"
                    }
                  >
                    <div className="flex md:block items-center justify-between gap-2 text-ellipsis md:w-[70%] lg:w-full max-w-full overflow-hidden">
                      <p className="font-medium text-sm inline-block md:hidden">
                        Id:
                      </p>
                      {coupon._id}
                    </div>
                    <div className="font-medium w-[95%] line-clamp-2 text-xs lg:text-sm flex items-center justify-between mt-3 md:mt-0">
                      <p className="font-medium text-sm inline-block md:hidden">
                        Name:
                      </p>
                      {coupon?.name}
                    </div>
                    <div className="font-medium flex items-center justify-between gap-6 md:mt-0 mt-3">
                      <p className="font-medium text-sm inline-block md:hidden">
                        Value:
                      </p>
                      {coupon?.value}$
                    </div>

                    <button
                      onClick={handleDelete.bind(null, coupon._id)}
                      className="flex justify-end md:justify-normal"
                    >
                      <FaTrash />
                    </button>
                  </Table>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-lg h-full">
              <p>No coupon has been created!</p>
            </div>
          )}
        </div>
      )}
      {open && (
        <CouponForm
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          value={value}
          setValue={setValue}
          isLoading={isLoading}
          maxUsage={maxUsage}
          setMaxUsage={setMaxUsage}
        />
      )}
    </>
  );
};

export default ShopAllCoupons;
