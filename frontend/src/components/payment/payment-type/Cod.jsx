import React from "react";

const Cod = ({ codHandler, setOpen, isLoading }) => {
  return (
    <div className="w-full flex">
      <form className="w-full" onSubmit={codHandler}>
        <button
          type="submit"
          className={`w-[150px] my-3 flex items-center justify-center rounded-xl bg-primary text-[#fff] h-[40px] text-[16px] font-[600] disabled:bg-primary/[0.4]`}
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default Cod;
