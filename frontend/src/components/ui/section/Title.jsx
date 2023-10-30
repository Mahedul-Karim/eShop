import React, { useEffect, useRef, useState } from "react";

function Title({ active, setActive }) {
  return (
    <div className="flex items-center flex-col sm:flex-row justify-center gap-3 relative">
      <h2
        className={`text-2xl font-[600] p-2 ${
          active === 1 ? "text-black" : "text-grey-200"
        } cursor-pointer ${active === 1 ? "active" : ""} relative title`}
        onClick={() => setActive(1)}
      >
        Featured
      </h2>
      <h2
        className={`text-2xl font-[600] p-2 ${
          active === 2 ? "text-black" : "text-grey-200"
        } cursor-pointer ${active === 2 ? "active" : ""} relative title`}
        onClick={() => setActive(2)}
      >
        On Sale
      </h2>
      <h2
        className={`text-2xl font-[600] p-2 ${
          active === 3 ? "text-black" : "text-grey-200"
        } cursor-pointer ${active === 3 ? "active" : ""} relative title`}
        onClick={() => setActive(3)}
      >
        Top rated
      </h2>
    </div>
  );
}

export default Title;
