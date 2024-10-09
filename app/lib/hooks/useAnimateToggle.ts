import { useEffect, useState } from "react";

const useAnimateToggle = (interval: number = 3000) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, interval);

    return () => clearInterval(animationInterval);
  }, [interval]);

  return animate;
};

export default useAnimateToggle;
