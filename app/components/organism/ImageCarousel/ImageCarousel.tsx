"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { carouselImages } from "@/app/lib/constants/global.constant";

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative w-full h-[40vh] md:h-[80vh] lg:h-screen overflow-hidden">
      <Image
        src={carouselImages[currentImageIndex].url}
        alt={carouselImages[currentImageIndex].alt}
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
};

export default ImageCarousel;
