import React, { useEffect, useRef, useState } from "react";
import Container from "../../util/Container";
import Carousel from "../ui/Carousel";

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
  {
    id: 3,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
  },
  {
    id: 4,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
  },
  {
    id: 4,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
  },
];
const Hero = () => {
  const [curSlide, setCurSlide] = useState(0);
  const containerRef = useRef();
  

  const nextSlide = () => {
    // setCurSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    if(curSlide === SLIDES.length - 2){
      SLIDES.forEach(slide=>SLIDES.push(slide))
    }
    setCurSlide(prev => prev+1)
  };

  const prevSlide = () => {
    setCurSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  return (
    <Container
      styles={"grid grid-cols-1 800px:grid-cols-[1fr_0.4fr] mt-6 gap-4"}
    >
      <div className="overflow-hidden relative w-full h-full">
        <div
          className="grid grid-flow-col auto-cols-[100%] transition-all w-full h-full"
          // className="flex transition-all w-full h-full"
          style={{
            transitionDuration: "0.6s",
          }}
          ref={containerRef}
        >
          {SLIDES.map((slider, i) => (
            <div
              id="slide"
              data-img={i}
              key={slider.id}
              // className="flex-shrink-0 w-full"
              className="w-full"
              style={{
                transform: `translateX(-${curSlide * 100}%)`,
                transition: "all 0.6s",
              }}
            >
              <img
                src={slider.src}
                className="w-full object-cover h-auto"
                alt={slider.alt}
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-[50%] -translate-y-[50%]"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-[50%] -translate-y-[50%]"
        >
          Next
        </button>
      </div>
      {/* <Carousel /> */}
      <div className={`bg-primary`}></div>
    </Container>
  );
};

export default Hero;
