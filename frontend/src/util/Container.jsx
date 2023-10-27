import React from "react";

function Container({ children,styles }) {
  return (
    <div className={`max-w-[1200px] mx-auto px-4 ${styles}`} id="container">
      {children}
    </div>
  );
}

export default Container;
