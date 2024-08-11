import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Loading from "../common/Loading";
import EventTable from "../../layout/data-table/EventTable";

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  const [isLoading, fetchData] = useHttp();

  useEffect(() => {
    const allEvents = async function () {
      const eventData = await fetchData("event");

      setEvents(eventData.event);
    };
    allEvents();
  }, []);

  

  return <>{isLoading ? <Loading /> : <EventTable isAdmin event={events} />}</>;
};

export default AllEvents;
