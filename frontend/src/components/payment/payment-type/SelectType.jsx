import React from "react";

const SelectType = ({ select, setSelect, value, title }) => {
  return (
    <div className="flex items-center w-full pb-5 border-b mb-2">
      <div
        className="w-[18px] h-[18px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
        onClick={setSelect}
      >
        {select === value && (
          <div className="w-[8px] h-[8px] bg-[#1d1a1acb] rounded-full" />
        )}
      </div>
      <h4
        className="text-[16px] pl-2 font-[600] text-[#000000b1] cursor-pointer"
        onClick={setSelect}
      >
        Pay with Debit/credit card
      </h4>
    </div>
  );
};

export default SelectType;
