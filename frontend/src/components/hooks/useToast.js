import React, { useRef, useState } from "react";
import { generateUniqeId } from "../../util/helpers";
import { useDispatch } from "react-redux";
import { createToast, deleteToast } from "../../store/toastSlice";

export const useToast = () => {
  const dispatch = useDispatch();

  const removeToast = (id, timeout) => {
    const container = document.getElementById("toast__container");

    if (!container) {
      return;
    }

    const childNodes = [...container.childNodes];

    const elementToRemove = childNodes.find(
      (elem) => elem.dataset.id.trim() === id.trim()
    );

    if (!elementToRemove) {
      return;
    }

    elementToRemove.classList.add("no-slide");

    if (timeout) {
      clearTimeout(timeout);
    }

    setTimeout(() => {
      dispatch(deleteToast({ id }));
    }, 600);
  };

  const generateToast = (type, message) => {
    const uuid = generateUniqeId();

    const toast = {
      id: uuid,
      type,
      message,
    };

    dispatch(createToast({ toast }));

    const timeout = setTimeout(() => {
      removeToast(uuid, timeout);
    }, 3000);
  };

  const success = (message) => {
    generateToast("success", message);
  };

  const error = (message) => {
    generateToast("error", message);
  };

  const warning = (message) => {
    generateToast("warning", message);
  };

  return {
    removeToast,
    success,
    error,
    warning,
  };
};
