import React from "react";
import { RxCross1 } from "react-icons/rx";

const CouponForm = ({
  setOpen,
  handleSubmit,
  name,
  setName,
  value,
  setValue,
  maxUsage,
  setMaxUsage,
  isLoading
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[40%] max-h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto hide-scrollbar">
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
              type="number"
              name="value"
              value={value}
              required
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setValue(+e.target.value)}
              placeholder="Enter your coupon code value..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Max Usage <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="value"
              value={maxUsage}
              required
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-primary sm:text-sm"
              onChange={(e) => setMaxUsage(+e.target.value)}
              placeholder="Enter your coupon code maximum usage"
            />
          </div>
          <br />
          
          
          <div>
            <button
              type="submit"
              value="Create"
              className="mt-2 block w-full px-3 h-[35px] border border-border rounded-[3px] focus:outline-none sm:text-sm text-white bg-primary     disabled:bg-primary/[0.4]"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
