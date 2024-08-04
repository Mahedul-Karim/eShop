import React from "react";
import { useToast } from "../hooks/useToast";

import { RxCross1 } from "react-icons/rx";

import { useSelector } from "react-redux";

const styles = {
  error: {
    bg: "bg-primary",
    text: "text-primary",
    title: "Error!",
  },
  success: {
    bg: "bg-blue-700",
    text: "text-blue-700",
    title: "Success!",
  },
  warning: {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    title: "Warning!",
  },
};

const Toast = () => {
  const { toasts } = useSelector((state) => state.toast);

  const { removeToast } = useToast();

  return (
    <>
      <div
        className="fixed inset-4 flex pointer-events-none flex-col justify-end items-end z-[99999] gap-4 overflow-x-clip"
        id="toast-container"
      >
        {toasts.length > 0 &&
          toasts.map((toast) => {
            const { bg, title, text } = styles[toast?.type];

            return (
              <div
                className={`w-[270px] min-h-[75px] bg-white rounded-md border border-solid overflow-clip flex gap-2 pointer-events-auto slide`}
                key={toast?.id}
                data-id={toast?.id}
              >
                <div className={`w-4 h-full ${bg}`} />
                <div className="flex items-center justify-between w-full py-2">
                  <div className="flex flex-col pl-1">
                    <h2 className={`${text} font-semibold text-sm`}>{title}</h2>
                    <p className="font-medium whitespace-pre-line">
                      {toast?.message}
                    </p>
                  </div>
                  <div className="px-2">
                    <button onClick={() => removeToast(toast?.id)}>
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Toast;
