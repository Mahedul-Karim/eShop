import React from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";

function Modal({ children, onClick, extraClass, open }) {
  const modalData = (
    <div
      className={`fixed top-0 left-0 bg-black/[0.3] h-screen w-screen z-[10] backdrop-blur-[10px] flex items-center justify-center ${
        open ? "visible" : "invisible delay-300"
      } transition-all duration-200 `}
    >
      <div
        className={`${
          extraClass ? extraClass : "w-full md:w-[40%]"
        }  bg-white rounded-md shadow-lg overflow-y-scroll relative duration-300 delay-200 transition-all  ${
          open ? "max-h-[300px] md:max-h-[400px] p-6 visible" : "max-h-0 p-0 invisible"
        } show-scrollbar`}
        
      >
        <button className="block absolute right-6 top-6" onClick={onClick}>
          <RxCross1 size={25} />
        </button>
        {children}
      </div>
    </div>
  );
  return createPortal(modalData, document.body);
}

export default Modal;
