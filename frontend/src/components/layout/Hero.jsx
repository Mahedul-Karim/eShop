import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../util/style";
import Container from "../../util/Container";

const Hero = () => {
  const [direction, setDirection] = useState(-1);

  const nextSlide = (e) => {
    e.target.parentElement.firstElementChild.style.transform =
      "translateX(-100%)";
    e.target.parentElement.firstElementChild.style.justifyContent =
      "flex-start";
    setDirection(-1);
  };

  const prevSlide = (e) => {
    e.target.parentElement.firstElementChild.style.transform =
      "translateX(100%)";
    e.target.parentElement.firstElementChild.style.justifyContent = "flex-end";
    setDirection(1);
  };

  const transitionEnd = (e) => {
    e.target.style.transitionDuration = "0ms";
    if (direction === -1) {
      e.target.appendChild(e.target.firstElementChild);
    } else if (direction === 1) {
      e.target.prepend(e.target.lastElementChild);
    }
    e.target.style.transform = "translateX(0%)";
    setTimeout(() => {
      e.target.style.transitionDuration = "0.6s";
    });
  };

  return (
    <Container
      styles={"grid grid-cols-1 800px:grid-cols-[1fr_0.4fr] mt-6 gap-4"}
    >
      <div className="flex flex-col items-center justify-center overflow-hidden relative">
        <div
          className="grid grid-flow-col auto-cols-[100%]"
          style={{
            transition: "all 0.8s",
          }}
          onTransitionEnd={transitionEnd}
          id="sld"
        >
          <div id="slide">
            <img
              src="/assets/slide-1.jpg"
              className="w-full object-cover h-auto"
            />
          </div>
          <div id="slide">
            <img
              src="/assets/slide-2.jpg"
              className="w-full object-cover h-auto"
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
      <div className="bg-primary"></div>
    </Container>
  );
};

export default Hero;
