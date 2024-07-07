import React, { useState } from "react";
import styles from "../../util/style";
import { CiSearch } from "react-icons/ci";
import SearchBar from "./SearchBar";
import Modal from "./modal/Modal";

const SearchIcon = ({ extraClass }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.noramlFlex} relative`}>
      <div
        className={`${extraClass} relative 800px:cursor-pointer`}
        onClick={() => setOpen(true)}
      >
        <CiSearch size={30} style={{ strokeWidth: "0.8px" }} />
      </div>
      {open && (
        <Modal onClick={setOpen.bind(null, false)} extraClass={'w-full md:w-[40%]'}>
          <SearchBar setOpen={setOpen}/>
        </Modal>
      )}
     
    </div>
  );
};

export default SearchIcon;
