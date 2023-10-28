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
  }
];
const Hero = () => {
  const [curSlide, setCurSlide] = useState(0);
  const containerRef = useRef();
  const [scr,setScr]=useState()
  
  useEffect(()=>{
    setScr(containerRef?.current?.firstElementChild?.offsetWidth)
  },[containerRef])

  const nextSlide = () => {
    // if (curSlide === SLIDES.length - 1) {
    //   return;
    // }
    setCurSlide((prev) => (prev + 1));
    
    setScr(prev => prev+prev)
    // containerRef.current.scrollLeft = scr ;
    // console.log(containerRef.current.scrollLeft)
    containerRef.current.style.transform=`translateX(-${containerRef?.current?.firstElementChild?.offsetWidth}px)`
  };

  const prevSlide = () => {
    // if (curSlide === 0) {
    //   return;
    // }
    // setCurSlide((prev) => (prev - 1));
    containerRef.current.style.transform=`translateX(${containerRef?.current?.firstElementChild?.offsetWidth}px)`;
  };

  return (
    <Container
      styles={"grid grid-cols-1 800px:grid-cols-[1fr_0.4fr] mt-6 gap-4"}
    >
      <div className="overflow-hidden relative">
        <div
          className="grid grid-flow-col auto-cols-[100%] transition-all"
          style={{
            transitionDuration: "0.6s",
          }}
          ref={containerRef}
        >
          {SLIDES.map((slider, i) => (
            <div id="slide" data-img={i} key={slider.id}>
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
