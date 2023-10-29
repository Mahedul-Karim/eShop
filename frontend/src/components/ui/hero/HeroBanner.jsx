import React from "react";
import { Link } from "react-router-dom";

function HeroBanner({ src, subtitle, title, to }) {
  return (
    <div className="h-full relative">
      <img src={src} alt="banner" className="w-full object-cover block h-full" />
      <div className="absolute top-[50%] left-[15px] -translate-y-[50%]">
        <h3 className="text-dot text-[12px] 400px:text-[18px] 800px:text-[14px]">{subtitle}</h3>
        <h1
          className="text-text-secondary text-[16px] 400px:text-[26px] 800px:text-[18px] font-[600] leading-6 400px:my-2 800px:my-0"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <Link
          to={to}
          className="flex text-[14px] 400px:text-[20px] 800px:text-[16px] items-center gap-2 text-secondary"
        >
          <span>Shop now</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default HeroBanner;
