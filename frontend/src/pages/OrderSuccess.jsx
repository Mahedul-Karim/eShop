import React from "react";


const Success = () => {
  return (
    <div >
     
      <h5 className="text-center text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

const OrderSuccessPage = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Success />
    </div>
  );
};

export default OrderSuccessPage;
