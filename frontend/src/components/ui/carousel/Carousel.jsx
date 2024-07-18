import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CarouselButton from "../button/CarouselButton";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const SLIDES = [
  {
    id: 0,
    src: "/assets/slide-1.jpg",
    alt: "slide img 1",
    subtitle: "Daily deals",
    title: "Airpods<br />Earphones",
    price: 1499,
    link: "",
  },
  {
    id: 1,
    src: "/assets/slide-2.jpg",
    alt: "slide img 2",
    subtitle: "Deals and promotions",
    title: "Echo dot<br/>3rd gen",
    price: 29,
    link: "",
  },

];

const Carousel = () => {
  const swiperRef = useRef();

  const nextSlide = () => {
    swiperRef.current.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current.slidePrev();
  };

  return (
    <div className="relative group">
      <Swiper
        loop
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className=""
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.src}
              className="w-full object-cover h-auto"
              alt={slide.alt}
            />
            <div className="absolute top-[50%] -translate-y-[50%] w-[300px] left-[60px] sm:left-[100px]">
              <h3 className="text-secondary text-[12px] 400px:text-[20px] font-[300] leading-[5px] mb-2">
                {slide.subtitle}
              </h3>
              <h1
                className="text-[20px] 400px:text-[30px] sm:text-[50px] font-[700] 400px:leading-[45px] sm:leading-[65px] text-text-secondary whitespace-pre"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              ></h1>
              <div className="flex gap-1">
                <p className="text-[12px] 400px:text-[18px] font-[400] sm:mt-[10px]">
                  Today:
                </p>
                <h2 className="text-secondary text-[14px] 400px:text-[25px] sm:text-[40px] font-[700]">
                  {slide.price}$
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <CarouselButton
        classes={
          "left-4 bg-white opacity-50 hover:bg-primary hover:opacity-100 hover:text-white z-[10] invisible group-hover:visible"
        }
        onClick={prevSlide}
      >
        <BsChevronLeft size={20} />
      </CarouselButton>

      <CarouselButton
        classes={
          "right-4 bg-white opacity-50 hover:bg-primary hover:opacity-100 hover:text-white z-[10] invisible group-hover:visible"
        }
        onClick={nextSlide}
      >
        <BsChevronRight size={20} />
      </CarouselButton>
    </div>
  );
};

export default Carousel;
