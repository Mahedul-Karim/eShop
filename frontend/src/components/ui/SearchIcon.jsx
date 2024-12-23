import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBar from "./SearchBar";
import Modal from "./modal/Modal";

const SearchIcon = ({ extraClass,containerStyle }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex items-center relative ${containerStyle}`}>
      <div
        className={`${extraClass} relative 800px:cursor-pointer`}
        onClick={() => setOpen(true)}
      >
        <CiSearch size={30}  />
      </div>
     
        <Modal onClick={setOpen.bind(null, false)} extraClass={'w-[80%] md:w-[40%]'} open={open}>
          <SearchBar setOpen={setOpen}/>
        </Modal>
 
     
    </div>
  );
};

export default SearchIcon;
