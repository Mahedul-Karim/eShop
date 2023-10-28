import React, { useEffect, useRef, useState } from "react";
import Container from "../../util/Container";
import Carousel from "../ui/carousel/Carousel";
import CarouselV2 from "../ui/carousel/Carousel-v2";

const SLIDES = [
  {
    id: 1,
    src: "/assets/slide-1.jpg",
    alt: "slide img 1",
  },
  {
    id: 2,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
  },
];
const Hero = () => {
  const [curSlide, setCurSlide] = useState(0);
  
  const containerRef = useRef();

 

  const nextSlide = () => {
    
    setCurSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    
    setCurSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const transitionEnd = () => {
   
  };

  return (
    <Container
      styles={"grid grid-cols-1 800px:grid-cols-[1fr_0.4fr] mt-6 gap-4"}
    >
   
      <Carousel />
      <div className={`bg-primary`}></div>
    </Container>
  );
};

export default Hero;
