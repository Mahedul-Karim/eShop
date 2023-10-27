import { useState } from "react";
import { categoriesData } from "../../util/data";
import styles from "../../util/style";

import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "./Dropdown";
import NavItems from "./NavItems";
import NavIcons from "./NavIcons";

function Nav({ activePage }) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div
      className={`flex-col 800px:flex-row ${styles.section} relative ${styles.noramlFlex} justify-between 800px:h-full`}
    >
      <div onClick={() => setDropdown((prev) => !prev)}>
        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
          <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
          <button
            className={`h-[100%] w-full flex justify-between items-center pl-10 bg-grey-50 font-sans text-lg font-[500] select-none rounded-t-md`}
          >
            All Categories
          </button>
          <IoIosArrowDown
            size={20}
            className="absolute right-2 top-4 cursor-pointer"
          />
          {dropdown ? (
            <Dropdown categoryData={categoriesData} setDropdown={setDropdown} />
          ) : null}
        </div>
      </div>
      <div className={`${styles.noramlFlex} h-full`}>
        <NavItems activePage={activePage} />
      </div>

      <div className="flex">
        <NavIcons />
      </div>
    </div>
  );
}
export default Nav;
