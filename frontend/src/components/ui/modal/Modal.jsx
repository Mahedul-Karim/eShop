import React from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";

function Modal({ children, onClick }) {
  const modalData = (
    <div className="fixed top-0 left-0 bg-black/[0.3] h-screen w-screen z-[10] backdrop-blur-[10px] flex items-center justify-center">
      <div
        className="w-full md:w-[80%] h-[60vh] sm:h-[80vh] bg-white rounded-md p-6 shadow-lg overflow-y-scroll relative"
        id="modal"
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
