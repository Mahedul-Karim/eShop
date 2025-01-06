import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import useOutsideClick from "../../hooks/useOutsideClick";

const Dropdown = ({ value, children }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    setOpen(false);
  });

  return (
    <div
      className={`p-2 border border-solid border-border rounded-md cursor-pointer text-sm flex items-center justify-between relative`}
      onClick={() => setOpen((prev) => !prev)}
      ref={dropdownRef}
    >
      {value}
      <span
        className={`transition-all duration-300 ${
          open ? "rotate-[180deg]" : "rotate-0"
        }`}
      >
        <FaChevronDown />
      </span>
      <div
        className={`absolute top-[45px] z-[5] bg-white border border-solid border-border rounded-md w-full left-0 flex flex-col [&>*]:py-2 [&>*]:px-4  shadow-lg transition-all duration-300 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-solid [&>*:not(:last-child)]:border-border ${
          open ? "visible opacity-1" : "invisible opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
