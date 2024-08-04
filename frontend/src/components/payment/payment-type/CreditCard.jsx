import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import React from "react";

const CreditCard = ({ paymentHandler, user, isLoading }) => {
  return (
    <div className="w-full flex border-b">
      <form className="w-full" onSubmit={paymentHandler}>
        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Name On Card</label>
            <input
              required
              placeholder={user && user.name}
              className={`border p-1 rounded-[5px] w-full text-[#444]`}
              value={user && user.name}
            />
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">Exp Date</label>
            <CardExpiryElement
              className={"w-full border p-1 rounded-[5px]"}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "#444",
                  },
                  
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    fontSize:'14px',
                    lineHeight: 1.5,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col 400px:flex-row pb-3 gap-4">
          <div className="400px:w-[50%]">
            <label className="block pb-2">Card Number</label>
            <CardNumberElement
              className={`border p-1 rounded-[5px] !h-[35px] w-full`}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    fontSize:'14px',
                    lineHeight: 1.7,
                  },
                },
              }}
            />
          </div>
          <div className="400px:w-[50%]">
            <label className="block pb-2">CVC</label>
            <CardCvcElement
              className={`w-full border p-1 rounded-[5px] !h-[35px]`}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    fontSize:'14px',
                    lineHeight: 1.7,
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-[150px] my-3 flex items-center justify-center rounded-xl bg-primary text-[#fff] h-[40px] text-[16px] font-[600] disabled:bg-primary/[0.4]`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreditCard;
