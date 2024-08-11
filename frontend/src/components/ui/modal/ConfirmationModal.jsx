import React from "react";
import Modal from "./Modal";

const ConfirmationModal = ({ open, setOpen, confirmationFunction, id }) => {
  return (
    <Modal
      open={open}
      onClick={() => setOpen(false)}
      extraClass={"w-[90%] 400px:w-[330px]"}
    >
      <div className="font-Roboto mt-9">
        <p className="text-lg">Are you sure? This action can not be undone</p>
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            className="bg-black text-white px-3 py-2 rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white px-3 py-2 rounded-md"
            onClick={confirmationFunction}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
