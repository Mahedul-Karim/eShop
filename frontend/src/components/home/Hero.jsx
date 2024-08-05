import React, { useEffect, useRef, useState } from "react";
import Container from "../../util/Container";
import Carousel from "../ui/carousel/Carousel";
import { Link } from "react-router-dom";
import HeroBanner from "../ui/hero/HeroBanner";

const HERO_BANNER = [
  {
    src: "/assets/banner-1.png",
    subtitle: "Smart offer",
    title: "Samsung galaxy<br /> Note9",
    to: "#",
  },
  {
    src: "/assets/banner-2 (1).jpg",
    subtitle: "Time deals",
    title: "Bose SoundSport",
    to: "#",
  },
  {
    src: "/assets/banner-2.jpg",
    subtitle: "Featured",
    title: "GoPro - Fusion 360",
    to: "#",
  },
];
//800px:grid-cols-[1fr_0.4fr]
const Hero = () => {
  return (
    <Container
      styles={"grid grid-cols-1 mt-6 gap-4 800px:grid-cols-[1fr_0.4fr]"}
    >
      <Carousel />
      <div
        className={`bg-white grid grid-cols-1 gap-4`}
      >
        {HERO_BANNER.map((item, index) => (
          <HeroBanner
            src={item.src}
            to={item.to}
            subtitle={item.subtitle}
            title={item.title}
            key={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default Hero;
