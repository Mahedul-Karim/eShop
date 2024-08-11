import React from "react";
import Loader from "../../../util/Loader";

const Loading = () => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
