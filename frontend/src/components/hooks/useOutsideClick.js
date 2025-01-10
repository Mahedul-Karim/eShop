import React, { useEffect } from "react";

const useOutsideClick = (ref, onClickOutside) => {
  useEffect(() => {
    if (!ref) return;

    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
};

export default useOutsideClick;
