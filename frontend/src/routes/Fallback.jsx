import React, { Suspense } from "react";
import Loader from "../util/Loader";

const Fallback = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="h-[80vh] w-full flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default Fallback;
