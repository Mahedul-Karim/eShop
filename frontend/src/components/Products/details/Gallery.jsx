import React, {  useRef, useState } from "react";
import CarouselButton from "../../ui/button/CarouselButton";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


let slide = 0;

let initialTranslate = 0;
let finalTranslate;
let clickedPoint;
let isDragging = false;

const Gallery = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const containerRef = useRef();

  const gotoSlide = (num) => {
    initialTranslate = -containerRef.current.clientWidth * num;

    containerRef.current.style.transform = `translateX(${initialTranslate}px)`;
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    slide = slide === 0 ? images.length - 1 : slide - 1;

    gotoSlide(slide);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    slide = slide === images.length - 1 ? 0 : slide + 1;

    gotoSlide(slide);
  };

  const handleMouseDown = (e) => {
    isDragging = true;

    clickedPoint = e.nativeEvent.pageX || e.touches[0].pageX;
  };

  const handleMouseUp = () => {
    isDragging = false;

    const movedValue = finalTranslate - initialTranslate;

    if (movedValue < -120) {
      if (slide !== images.length - 1) {
        setActiveSlide((prev) => prev + 1);
        slide = slide + 1;
      } else {
        setActiveSlide(images.length - 1);
        slide = images.length - 1;
      }
    } else if (movedValue > 120) {
      if (slide === 0) {
        setActiveSlide(0);
        slide = 0;
      } else {
        setActiveSlide((prev) => prev - 1);
        slide = slide - 1;
      }
    }
    gotoSlide(slide);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    e.preventDefault();

    const movingPoint = e.nativeEvent.pageX || e.touches[0].pageX;

    finalTranslate = initialTranslate + (movingPoint - clickedPoint);

    containerRef.current.style.transform = `translateX(${finalTranslate}px)`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex overflow-x-clip relative group transition-all duration-300">
        <div
          className="flex transition-all duration-300 w-full"
          ref={containerRef}
          style={{
            transform: "translateX(0px)",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => (isDragging = false)}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {images?.map((img, i) => (
            <div key={img.public_id} className="shrink-0 w-full" data-tab={i}>
              <img
                src={img.url}
                alt=""
                className="w-full object-contain h-[200px] 400px:h-[350px] sm:h-[380px] bg-white"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
        <CarouselButton
          classes={
            "left-4 bg-white opacity-50 hover:bg-primary group-hover:opacity-100 hover:text-white z-[10]"
          }
          onClick={prevSlide}
        >
          <BsChevronLeft size={20} />
        </CarouselButton>

        <CarouselButton
          classes={
            "right-4 bg-white opacity-50 hover:bg-primary group-hover:opacity-100 hover:text-white z-[10]"
          }
          onClick={nextSlide}
        >
          <BsChevronRight size={20} />
        </CarouselButton>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images?.map((img, i) => (
          <div
            key={img.public_id}
            onClick={() => {
              setActiveSlide((prev) => i);
              slide = i;
              gotoSlide(i);
            }}
            className="cursor-pointer"
          >
            <img
              src={img.url}
              alt=""
              className={`w-full object-cover bg-slate-100 h-[60px] 400px:h-[100px] sm:h-[140px] ${
                activeSlide === i
                  ? "border-2 border-solid border-primary"
                  : "border-none"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
