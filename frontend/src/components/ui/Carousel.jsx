import React, { useRef, useState } from "react";
import Container from "../../util/Container";

const Carousel = () => {
  const [currentSlide,setCurrentSlide]=useState("1");
  
  const containerRef = useRef();

  let direction = "nextSlide";
  let curSlide ="1";

  const nextSlide = () => {
    // setCurrentSlide(()=>containerRef.current.lastElementChild.dataset.img)
    if (direction === "prevSlide") {
      containerRef.current.appendChild(containerRef.current.firstElementChild);
      
    }
    direction = "nextSlide";
    containerRef.current.style.justifyContent = "flex-start";
    containerRef.current.style.transform = "translateX(-100%)";
    // setCurrentSlide(containerRef.current.lastElementChild.dataset.img)
    // curSlide=containerRef.current.lastElementChild.dataset.img
    // console.log(curSlide)
  };

  const prevSlide = () => {
    if (direction === "nextSlide") {
      containerRef.current.prepend(containerRef.current.lastElementChild);
      
    }
    direction = "prevSlide";
    containerRef.current.style.justifyContent = "flex-end";
    containerRef.current.style.transform = "translateX(100%)";
    // setCurrentSlide(()=>containerRef.current.firstElementChild.dataset.img)
    // curSlide=containerRef.current.firstElementChild.dataset.img
    // console.log(curSlide)
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
  console.log(currentSlide)
  return (
   
      <div className="flex flex-col items-center justify-center overflow-hidden relative">
        <div
          className="grid grid-flow-col auto-cols-[100%] transition-all"
          onTransitionEnd={transitionEnd}
          ref={containerRef}
          style={{ transitionDuration: "0.6s" }}
        >
          <div id="slide" data-img="1">
            <img
              src="/assets/slide-1.jpg"
              className="w-full object-cover h-auto"
              alt="slide img 1"
            />
          </div>
          <div id="slide" data-img="2">
            <img
              src="/assets/slide-2.jpg"
              className="w-full object-cover h-auto"
              alt="slide img 2"
            />
          </div>
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
