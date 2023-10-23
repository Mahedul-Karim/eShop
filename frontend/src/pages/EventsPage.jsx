import React from "react";
import EventCard from "../components/layout/EventCard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const EventsPage = () => {
  return (
    <>
      <Header activePage={4} />
      <EventCard active={true} />
      <Footer />
    </>
  );
};

export default EventsPage;
