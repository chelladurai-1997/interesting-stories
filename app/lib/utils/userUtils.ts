// utils/userUtils.ts

import { Types } from "mongoose";
import User from "../models/user.model";

interface UpdateStepParams {
  userId: string | Types.ObjectId;
  step: number;
}

// This function tries to update the user's last completed step and retries with exponential backoff if it fails.
export const updateUserLastCompletedStep = ({
  userId,
  step,
}: UpdateStepParams): void => {
  const maxRetries = 2; // Let's keep our optimism low. Retry 2 times.
  const baseDelay = 1000; // Start with a 1-second delay for exponential backoff

  // This little function is like the Rocky Balboa of functions. It keeps getting knocked down, but it gets back up.
  const tryUpdate = (retryCount: number): void => {
    User.findByIdAndUpdate(userId, {
      lastCompletedStep: step,
    })
      .then(() => {
        console.log(`Successfully updated user step`);
      })
      .catch((error) => {
        // Something went wrong. But don't panic, we've got retries.
        if (error instanceof Error) {
          console.error(
            `Failed to update user step (attempt ${retryCount + 1}): ${
              error.message
            }`
          );
        } else {
          console.error(
            `Failed to update user step (attempt ${
              retryCount + 1
            }): unknown error`
          );
        }

        // If we haven't exhausted our retry attempts yet, let's prepare for another round.
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * baseDelay; // Exponential backoff: 1s, 2s, 4s...

          setTimeout(() => tryUpdate(retryCount + 1), retryDelay); // Wait and retry
        } else {
          // At this point, we have tried our best. Time to accept defeat.
          console.error(
            `Failed to update user step after ${maxRetries} attempts`
          );
        }
      });
  };

  // Start the first attempt with no delay
  tryUpdate(0);
};
