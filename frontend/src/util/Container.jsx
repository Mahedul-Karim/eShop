import React from "react";

function Container({ children,styles }) {
  return (
    <div className={`max-w-[1200px] mx-auto ${styles} w-11/12 overflow-clip`}>
      {children}
    </div>
  );
}

export default Container;
