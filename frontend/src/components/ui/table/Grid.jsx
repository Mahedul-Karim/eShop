import React from "react";

const TableGrid = ({ children, extraClass,isCart }) => {
  return (
    <div
      className={`grid grid-cols-1 ${!isCart ? "md:grid-cols-[1fr_0.4fr_0.4fr_0.1fr_0.1fr]" : "md:grid-cols-[1fr_0.4fr_0.4fr_0.3fr_0.1fr]"}  ${extraClass}`}
    >
      {children}
    </div>
  );
};

export default TableGrid;
