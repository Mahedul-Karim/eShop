import React from "react";
import { RxCross1 } from "react-icons/rx";

const CouponForm = ({
  setOpen,
  handleSubmit,
  name,
  setName,
  value,
  setValue,
  minAmount,
  setMinAmout,
  maxAmount,
  setMaxAmount,
  selectedProducts,
  setSelectedProducts,
  product
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto hide-scrollbar">
        <div className="w-full flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <h5 className="text-2xl 400px:text-[30px] font-Poppins text-center">
          Create Coupon code
        </h5>
        {/* create coupoun code */}
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={name}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your coupon code name..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Discount Percentenge <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="value"
              value={value}
              required
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your coupon code value..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Min Amount</label>
            <input
              type="number"
              name="value"
              value={minAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setMinAmout(e.target.value)}
              placeholder="Enter your coupon code min amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Max Amount</label>
            <input
              type="number"
              name="value"
              value={maxAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Enter your coupon code max amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Selected Product</label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={selectedProducts}
              onChange={(e) => setSelectedProducts(e.target.value)}
            >
              <option value="Choose your selected products">
                Choose a selected product
              </option>
              {product &&
                product.map((i) => (
                  <option value={i.name} key={i.name}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <button
              type="submit"
              value="Create"
              className="mt-2 block w-full px-3 h-[35px] border border-primary rounded-[3px] focus:outline-none sm:text-sm text-primary"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
