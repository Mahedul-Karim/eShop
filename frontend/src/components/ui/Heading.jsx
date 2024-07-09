import React from "react";

function Heading({ children }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[15px] h-[25px] 400px:w-[20px] 400px:h-[40px] bg-primary rounded-md" />
      <p className="text-[14px] 400px:text-base text-primary">{children}</p>
    </div>
  );
}

export default Heading;
