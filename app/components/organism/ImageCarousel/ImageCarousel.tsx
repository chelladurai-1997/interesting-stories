"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ImageCarousel = () => {
  const images = [
    {
      url: "https://plus.unsplash.com/premium_photo-1682092597591-81f59c80d9ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "a white cat is holding a gray cat in its arms and they are standing next to each other.",
    },
    {
      url: "https://media.istockphoto.com/id/937786912/photo/south-indian-wedding.webp?a=1&b=1&s=612x612&w=0&k=20&c=0zX1op-lQgT3tdT-NADmfGzue9V0KXAemgpEN9zxEVM=",
      alt: "a dog wearing sunglasses at the beach.",
    },
    {
      url: "https://media.istockphoto.com/id/2152779035/photo/handmade-clay-lord-ganesha-idol-for-pooja-in-a-south-indian-hindu-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=OellI3r9tJu13yJI2DLQ6d6r0kR9Q7LMBdiHf9qpMnM=",
      alt: "a sunset over a city skyline.",
    },
    {
      url: "https://media.istockphoto.com/id/937786916/photo/south-indian-wedding.webp?a=1&b=1&s=612x612&w=0&k=20&c=3jpKf2QovAWA-3C3GQmiLAwipjta1LvNSLBa3vzPiGI=",
      alt: "a sunset over a city skyline.",
    },
    {
      url: "https://media.istockphoto.com/id/2168707868/photo/indian-couple-holding-hand-close-up-in-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=YohVKdmbHl85l5Iy_retZo7uMDh53b7B-TEx5EmxF5c=",
      alt: "a sunset over a city skyline.",
    },
    {
      url: "https://media.istockphoto.com/id/1179299016/photo/indian-wedding-ceremony-decorations-for-traditional-ethnic-rituals-for-marriage-fire-burning.webp?a=1&b=1&s=612x612&w=0&k=20&c=_lijzUlDcRXhGzJ9fssYd6nI7_FzdrIo78YxvAZp9sE=",
      alt: "a sunset over a city skyline.",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[275px] lg:h-[400px] overflow-hidden">
      <Image
        src={images[currentImageIndex].url}
        alt={images[currentImageIndex].alt}
        layout="fill" // This will make the image fill the container
        objectFit="cover" // Ensures the image covers the container without stretching
        priority // Optional: load the image as high priority
      />
    </div>
  );
};

export default ImageCarousel;
