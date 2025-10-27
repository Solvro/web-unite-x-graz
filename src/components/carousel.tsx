"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface CarouselImage {
  id: string;
  image: string;
}

export function Carousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/carousel-images");
        const data = (await response.json()) as { data: CarouselImage[] };
        setImages(data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    void fetchImages();
  }, []);

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
        {images.map((img) => (
          <div key={img.id} className="flex justify-center">
            <Image
              src={`https://directus-twoc08g80owskccsgcw04cgg.s.solvro.pl/assets/${img.image}`}
              alt="carousel"
              className="size-64 rounded-xl object-cover"
              width={256}
              height={256}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
