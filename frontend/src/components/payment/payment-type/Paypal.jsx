import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { RxCross1 } from "react-icons/rx";

const Paypal = ({ isLoading, setOpen, open, onApprove, createOrder }) => {
  return (
    <div className="w-full flex border-b">
      <button
        className={`w-[150px] my-3 flex items-center justify-center rounded-xl bg-primary text-[#fff] h-[40px] text-[16px] font-[600] disabled:bg-primary/[0.4]`}
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {open && (
        <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
          <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer absolute top-3 right-3"
                onClick={() => setOpen(false)}
              />
            </div>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "Aa4IkyGDXpSZNJQt_IxuvKalWNBSM-GUCy86mn0D76jeggpM4y47KwKfEiWq-zYoTUublD0qzENkZOT5",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                onApprove={onApprove}
                createOrder={createOrder}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paypal;
