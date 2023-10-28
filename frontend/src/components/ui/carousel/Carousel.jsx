import React, { useEffect, useRef, useState } from "react";
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
  const [currentSlide,setCurrentSlide]=useState("1");
  
  const containerRef = useRef();

  let direction = "nextSlide";



  const nextSlide = () => {
    // setCurrentSlide(()=>containerRef.current.lastElementChild.dataset.img)
    if (direction === "prevSlide") {
      containerRef.current.appendChild(containerRef.current.firstElementChild);
      
    }
    direction = "nextSlide";
    containerRef.current.style.justifyContent = "flex-start";
    containerRef.current.style.transform = "translateX(-100%)";
    
  };

  const prevSlide = () => {
    if (direction === "nextSlide") {
      containerRef.current.prepend(containerRef.current.lastElementChild);
      
    }
    direction = "prevSlide";
    containerRef.current.style.justifyContent = "flex-end";
    containerRef.current.style.transform = "translateX(100%)";
  };

  const transitionEnd = () => {
    containerRef.current.style.transitionDuration = "0ms";
    if (direction === "nextSlide") {
      containerRef.current.appendChild(containerRef.current.firstElementChild);
      // setCurrentSlide(containerRef.current.firstElementChild.dataset.img)
    } else if (direction === "prevSlide") {
      containerRef.current.prepend(containerRef.current.lastElementChild);
      // setCurrentSlide(containerRef.current.lastElementChild.dataset.img)
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
          {SLIDES.map(slide=><div id="slide" data-img="1" key={slide.id}>
            <img
              src={slide.src}
              className="w-full object-cover h-auto"
              alt={slide.alt}
            />
          </div>)}
          
         
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
     
  );
};

export default Carousel;
