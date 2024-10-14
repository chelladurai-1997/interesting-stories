import Interests, { IInterest, InterestStatus } from "../models/interest.model";

// Allowed time interval for rate-limiting in milliseconds (e.g., 1 minute)
const RATE_LIMIT_INTERVAL = 60 * 1000; // 1 minute

// Helper function to validate interest request
export const validateInterestRequest = (
  senderId: string,
  receiverId: string,
  status: InterestStatus
) => {
  if (!senderId || !receiverId) {
    throw new Error("SenderId and ReceiverId are required.");
  }

  // Prevent interests to self
  if (senderId === receiverId) {
    throw new Error("You cannot send interest to yourself.");
  }

  // Validate status
  const validStatuses = Object.values(InterestStatus);
  if (status && !validStatuses.includes(status)) {
    throw new Error("Invalid interest status.");
  }
};

// Helper function for rate-limiting based on time interval
export const isRateLimited = (existingInterest: IInterest): boolean => {
  const now = new Date();
  const timeSinceLastUpdate =
    now.getTime() - existingInterest.updatedAt.getTime();

  // Log rate-limiting info for debugging/monitoring purposes
  console.info(`Time since last interest update: ${timeSinceLastUpdate}ms`);

  // Rate limit check (e.g., prevent updates if within 1 minute)
  return timeSinceLastUpdate < RATE_LIMIT_INTERVAL;
};

// Helper function to handle interest creation
export const createInterest = async (
  senderId: string,
  receiverId: string
): Promise<IInterest | null> => {
  try {
    const newInterest: IInterest = new Interests({
      senderId,
      receiverId,
      status: InterestStatus.PENDING,
    });

    const savedInterest = await newInterest.save();

    console.info(`Interest created successfully: ${savedInterest}`);
    return savedInterest;
  } catch (error) {
    console.error("Error creating interest:", error);
    throw new Error("Failed to create new interest.");
  }
};

// Helper function to handle interest updates
export const updateInterestStatus = async (
  existingInterest: IInterest,
  newStatus: InterestStatus
): Promise<IInterest | null> => {
  try {
    existingInterest.status = newStatus;
    const updatedInterest = await existingInterest.save();

    console.info(`Interest updated successfully: ${updatedInterest}`);
    return updatedInterest;
  } catch (error) {
    console.error("Error updating interest status:", error);
    throw new Error("Failed to update interest status.");
  }
};
