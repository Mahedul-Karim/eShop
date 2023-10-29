import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CarouselButton from "../button/CarouselButton";
const SLIDES = [
  {
    id: 0,
    src: "/assets/slide-1.jpg",
    alt: "slide img 1",
  },
  {
    id: 1,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("nextSlide");
  const containerRef = useRef();

  const nextSlide = () => {
    if (direction === "prevSlide") {
      containerRef.current.appendChild(containerRef.current.firstElementChild);
    }
    setDirection("nextSlide");
    containerRef.current.style.justifyContent = "flex-start";
    containerRef.current.style.transform = "translateX(-100%)";
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (direction === "nextSlide") {
      containerRef.current.prepend(containerRef.current.lastElementChild);
    }
    setDirection("prevSlide");
    containerRef.current.style.justifyContent = "flex-end";
    containerRef.current.style.transform = "translateX(100%)";
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const transitionEnd = () => {
    containerRef.current.style.transitionDuration = "0ms";
    if (direction === "nextSlide") {
      containerRef.current.appendChild(containerRef.current.firstElementChild);
    } else if (direction === "prevSlide") {
      containerRef.current.prepend(containerRef.current.lastElementChild);
    }
    containerRef.current.style.transform = "translateX(0%)";
    setTimeout(() => {
      containerRef.current.style.transitionDuration = "0.6s";
    });
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden relative">
      <div
        className="grid grid-flow-col auto-cols-[100%] transition-all"
        onTransitionEnd={transitionEnd}
        ref={containerRef}
        style={{ transitionDuration: "0.6s" }}
      >
        {SLIDES.map((slide) => (
          <div id="slide" data-img="1" key={slide.id}>
            <img
              src={slide.src}
              className="w-full object-cover h-auto"
              alt={slide.alt}
            />
          </div>
        ))}
      </div>
      <CarouselButton classes={"left-4"} onClick={prevSlide}>
        <BsChevronLeft size={20} />
      </CarouselButton>

      <CarouselButton classes={"right-4"} onClick={nextSlide}>
        <BsChevronRight size={20} />
      </CarouselButton>

      <div className="absolute bottom-[12px] left-[50%] -translate-x-[50%] flex items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            className={`w-[10px] h-[10px] ${
              index === currentSlide
                ? "bg-primary border-0"
                : "bg-transparent border-[1px]"
            } block  border-solid border-dot rounded-full`}
            key={index}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
