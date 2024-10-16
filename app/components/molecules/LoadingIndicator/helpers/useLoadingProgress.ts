import { useEffect, useState } from "react";

const useLoadingProgress = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let finalIncrementInterval: NodeJS.Timeout | null = null;
    let increment = 0.5; // Increase the increment amount for faster progress
    let incrementSpeed = 0.05; // Speed up the increment

    // Initial progress phase up to 98%
    if (progress < 98) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 98) {
            const newProgress = Math.min(prev + increment, 98);
            increment = increment + incrementSpeed; // Gradually increase speed
            return newProgress;
          }
          return prev;
        });
      }, 30); // Faster update interval for quicker animation
    } else {
      // Final increment phase from 98% to 98.99%
      if (progressInterval) clearInterval(progressInterval);

      let finalIncrement = 0.1;
      let slowDownSpeed = 0.01; // Slow down increment speed

      finalIncrementInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 98.99) {
            const newProgress = Math.min(prev + finalIncrement, 98.99);
            finalIncrement = finalIncrement - slowDownSpeed; // Gradually slow down
            return newProgress;
          }
          return prev;
        });
      }, 30); // Faster update interval for quicker animation
    }

    // Cleanup intervals on unmount
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (finalIncrementInterval) clearInterval(finalIncrementInterval);
    };
  }, [progress]);

  return progress;
};

export default useLoadingProgress;
