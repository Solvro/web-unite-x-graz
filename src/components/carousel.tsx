"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 3000,
    autoplaySpeed: 3000,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container w-full">
      <Slider {...settings}>
        <div className="size-64">
          <h3>1</h3>
        </div>
        <div className="size-64">
          <h3>2</h3>
        </div>
        <div className="size-64">
          <h3>3</h3>
        </div>
        <div className="size-64">
          <h3>4</h3>
        </div>
      </Slider>
    </div>
  );
}
export { Carousel };
