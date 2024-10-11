import confetti from "canvas-confetti";

// Define ConfettiConfig type (based on canvas-confetti options)
type ConfettiConfig = {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  particleCount?: number;
  origin?: { x?: number; y?: number };
};

// Configuration for the confetti defaults
const defaults: ConfettiConfig = { origin: { y: 0.7 } };
const count = 200;

// Helper function to fire confetti
const fireConfetti = (particleRatio: number, opts?: ConfettiConfig): void => {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
};

// Function to trigger confetti in different patterns
const launchConfetti = (): void => {
  fireConfetti(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fireConfetti(0.2, {
    spread: 60,
  });
  fireConfetti(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fireConfetti(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fireConfetti(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Function for the continuous confetti animation
const continueConfetti = (
  duration: number,
  animationEnd: number,
  interval: NodeJS.Timeout
): void => {
  const timeLeft = animationEnd - Date.now();
  if (timeLeft <= 0) {
    clearInterval(interval);
    return;
  }

  const particleCount = 50 * (timeLeft / duration);

  // Utility function for random range
  const randomInRange = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

  confetti({
    ...defaults,
    particleCount,
    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  });
  confetti({
    ...defaults,
    particleCount,
    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  });
};

// Main function to start confetti
export const startConfetti = (
  duration: number = 15000,
  localStorageKey?: string
): void => {
  launchConfetti();

  const animationEnd = Date.now() + duration;
  const interval = setInterval(() => {
    continueConfetti(duration, animationEnd, interval);
  }, 250);

  setTimeout(() => {
    clearInterval(interval);
    fireConfetti(1, {
      spread: 180,
      startVelocity: 45,
    });

    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  }, duration);
};
