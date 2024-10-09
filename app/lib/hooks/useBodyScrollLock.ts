import { useEffect } from "react";

/**
 * A custom hook to manage the body's overflow property
 * based on the provided 'isLocked' boolean.
 *
 * @param {boolean} isLocked - A boolean to indicate whether to lock the body scroll.
 */
const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
    } else {
      document.body.style.overflow = "unset"; // Enable background scrolling
    }

    // Cleanup function to reset overflow on component unmount
    return () => {
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
