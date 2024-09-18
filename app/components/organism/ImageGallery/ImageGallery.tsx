import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define the props interface
interface ImageGalleryProps {
  images: string[];
}

// Custom SVG for the close button
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-8 h-8 text-red-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [modalTransition, setModalTransition] = useState<string>("opacity-0");
  const modalRef = useRef<HTMLDivElement>(null);

  const [startTouchX, setStartTouchX] = useState<number | null>(null);

  // Open modal and apply transition
  const openModal = (index: number): void => {
    setSelectedIndex(index);
    setIsOpen(true);
    setModalTransition("opacity-0"); // Reset opacity
    setTimeout(() => {
      setModalTransition("opacity-100"); // Apply fade-in after opening
    }, 50);
  };

  // Close modal with fade-out transition
  const closeModal = (): void => {
    setModalTransition("opacity-0"); // Start fade-out
    setTimeout(() => setIsOpen(false), 300); // Wait for the animation before closing
  };

  // Trap focus in modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Handle keypress events for navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrevious();
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  // Show next image with fade transition
  const showNext = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 300); // Wait for fade effect
  };

  // Show previous image with fade transition
  const showPrevious = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setStartTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endTouchX = e.changedTouches[0].clientX;
    if (startTouchX === null) return;

    const touchDiff = startTouchX - endTouchX;
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
    setStartTouchX(null);
  };

  // Render pagination dots
  const renderPaginationDots = (): JSX.Element[] => {
    return images.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 mx-1 rounded-full ${
          index === selectedIndex ? "bg-gray-800" : "bg-gray-300"
        } focus:outline-none`}
        aria-label={`Page ${index + 1}`}
        onClick={() => setSelectedIndex(index)}
      />
    ));
  };

  return (
    <div className="relative">
      {/* First image preview with "View More" */}
      <div
        className="cursor-pointer relative"
        onClick={() => openModal(0)}
        tabIndex={0}
        role="button"
        aria-label="Open image gallery"
        onKeyDown={(e) => e.key === "Enter" && openModal(0)}
      >
        <Image
          src={images[0]}
          alt="Preview of first image"
          layout="responsive"
          width={800} // Adjusted width for better visibility
          height={600} // Adjusted height for better visibility
          className="w-full h-[250px] md:h-auto object-cover rounded aspect-square md:aspect-auto"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
              View More ({images.length})
            </span>
          </div>
        )}
      </div>

      {/* Modal popup */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ${modalTransition}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          ref={modalRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-h-screen bg-white rounded shadow-lg overflow-auto p-4 w-full max-w-screen-md">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-transparent border-none"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            {/* Image Display with fade effect */}
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={images[selectedIndex]}
                alt={`Image ${selectedIndex + 1}`}
                layout="responsive"
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain "
              />
            </div>

            {/* Navigation and Pagination */}
            {images.length > 1 && (
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center w-full justify-between">
                  <button
                    onClick={showPrevious}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    aria-label="Previous image"
                  >
                    Previous
                  </button>
                  <div className="flex items-center">
                    {renderPaginationDots()}
                  </div>
                  <button
                    onClick={showNext}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    aria-label="Next image"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
