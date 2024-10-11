import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Container from "../Container/Container";

// Define the types for the component props
interface MovingImagesCarouselProps {
  images: string[]; // Array of image URLs
  duplicateCount?: number; // Optional, number of times the images are repeated
  direction?: "left" | "right"; // Specify the allowed directions
  speed?: number; // Specify speed type
}

const MarqueeCarousel: React.FC<MovingImagesCarouselProps> = ({
  images,
  duplicateCount = 3,
  direction = "left",
  speed = 40,
}) => {
  // Flatten the images array to repeat them
  const repeatedImages = Array(duplicateCount).fill(images).flat();

  return (
    <Container>
      <div className="overflow-hidden w-full bg-gradient-to-br py-3">
        <Marquee gradient={false} speed={speed} direction={direction} loop={0}>
          {repeatedImages.map((image, index) => (
            <div key={index} className="mr-4">
              <Image
                src={image}
                alt={`carousel-image-${index}`}
                width={192} // Set your desired width
                height={260} // Set your desired height
                className="w-48 h-[260px] md:h-[295px] object-cover rounded-lg shadow-md" // Ensure to maintain the exact styles
              />
            </div>
          ))}
        </Marquee>
      </div>
    </Container>
  );
};

export default MarqueeCarousel;
