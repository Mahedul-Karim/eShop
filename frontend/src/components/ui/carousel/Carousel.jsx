import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CarouselButton from "../button/CarouselButton";
import { Link } from 'react-router-dom';
const SLIDES = [
  {
    id: 0,
    src: "/assets/slide-1.jpg",
    alt: "slide img 1",
    subtitle:'Daily deals',
    title:'Airpods<br />Earphones',
    price:1499,
    link:''
  },
  {
    id: 1,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
    subtitle:'Deals and promotions',
    title:'Echo dot<br/>3rd gen',
    price:29,
    link:''
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
          <div id="slide" className="relative" key={slide.id}>
            
            <img
              src={slide.src}
              className="w-full object-cover h-auto"
              alt={slide.alt}
            />
            <div className="absolute top-[50%] -translate-y-[50%] w-[300px] left-[60px] sm:left-[100px]">
              <h3 className="text-secondary text-[12px] 400px:text-[20px] font-[300] leading-[5px] mb-2">{slide.subtitle}</h3>
              <h1 className="text-[20px] 400px:text-[30px] sm:text-[50px] font-[700] 400px:leading-[45px] sm:leading-[65px] text-text-secondary whitespace-pre" dangerouslySetInnerHTML={{__html:slide.title}}></h1>
              <div className="flex gap-1">
                <p className="text-[12px] 400px:text-[18px] font-[400] sm:mt-[10px]">Today:</p>
                <h2 className="text-secondary text-[14px] 400px:text-[25px] sm:text-[40px] font-[700]">{slide.price}$</h2>
              </div>
              <Link className="flex text-[12px] items-center gap-2 bg-secondary p-[0.2px] sm:px-3 sm:py-2 justify-center w-[100px] 400px:w-[150px] rounded-full text-white"><span>Click here</span><span>&rarr;</span></Link>
            </div>
          </div>
        ))}
      </div>
      <CarouselButton classes={"left-4 bg-white opacity-50 hover:bg-primary hover:opacity-100 hover:text-white"} onClick={prevSlide}>
        <BsChevronLeft size={20} />
      </CarouselButton>

      <CarouselButton classes={"right-4 bg-white opacity-50 hover:bg-primary hover:opacity-100 hover:text-white"} onClick={nextSlide}>
        <BsChevronRight size={20} />
      </CarouselButton>

      <div className="absolute bottom-[12px] left-[50%] -translate-x-[50%] hidden 400px:flex items-center gap-2">
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
