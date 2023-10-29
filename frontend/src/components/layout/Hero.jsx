import React, { useEffect, useRef, useState } from "react";
import Container from "../../util/Container";
import Carousel from "../ui/carousel/Carousel";
import { Link } from "react-router-dom";
import HeroBanner from "../ui/hero/HeroBanner";

const HERO_BANNER = [
  {
    src: "/assets/banner-1.jpg",
    subtitle: "Top product",
    title: "Edifier<br /> stereo bluetooth",
    to: "#",
  },
  {
    src: "/assets/banner-2.jpg",
    subtitle: "Clearance",
    title: "GoPro - Fusion 360",
    to: "#",
  },
  {
    src: "/assets/banner-3.jpg",
    subtitle: "Featured",
    title: "Apple watch 4",
    to: "#",
  },
];

const Hero = () => {
  return (
    <Container
      styles={"grid grid-cols-1 800px:grid-cols-[1fr_0.4fr] mt-6 gap-4"}
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
