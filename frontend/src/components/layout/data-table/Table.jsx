import React from "react";

const Table = ({ columns, children, extraStyles = "" }) => {
  return (
    <div
      className={`grid ${
        columns ? columns : "grid-cols-1 md:grid-cols-[0.5fr_0.6fr_0.3fr_0.3fr_0.2fr]"
      } ${extraStyles} p-2 py-3`}
    >
      {children}
    </div>
  );
};

export default Table;
