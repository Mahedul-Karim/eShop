import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventActions } from "../../../store/eventSlice";
import { BASE_URL } from "../../../util/base";
import Loading from "../common/Loading";

import { useToast } from "../../hooks/useToast";
import Table from "../../layout/data-table/Table";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import EventTable from "../../layout/data-table/EventTable";

const ShopAllEvents = () => {
  const { event, isEventLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  const { success, error } = useToast();

  useEffect(() => {
    const getEvents = async function () {
      try {
        dispatch(eventActions.eventRequest());
        const res = await fetch(`${BASE_URL}/event/${seller._id}`);

        const data = await res.json();

        if (data.status === "failed") {
          throw new Error(data.message);
        }

        dispatch(eventActions.allevents(data.event));
      } catch (err) {
        error(err.message);
      }
    };

    getEvents();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      dispatch(eventActions.eventRequest());
      const res = await fetch(`${BASE_URL}/event/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.status === "failed") {
        throw new Error(data.message);
      }

      dispatch(eventActions.deleteevents(id));
      success(data.message);
    } catch (err) {
      error(err.message);
    }
  };
  
  return (
    <>
      {isEventLoading ? (
        <Loading />
      ) : (
        <EventTable event={event} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default ShopAllEvents;
