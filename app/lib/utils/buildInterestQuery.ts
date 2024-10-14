import mongoose from "mongoose";

/**
 * Utility function to build a Mongoose query based on interestId, senderId, and receiverId.
 * It checks for:
 * - Exact match of interestId
 * - Exact match of senderId and receiverId
 * - Swapped senderId and receiverId (receiverId as senderId and vice versa)
 *
 * @param interestId - The ID of the interest document (optional)
 * @param senderId - The ID of the user sending the interest (optional)
 * @param receiverId - The ID of the user receiving the interest (optional)
 * @returns A Mongoose query object to be used in find operations
 */
export const buildInterestQuery = (
  interestId?: string,
  senderId?: string,
  receiverId?: string
): mongoose.FilterQuery<any> => {
  let query: mongoose.FilterQuery<any> = {};

  const isValidObjectId = (id: string | undefined) =>
    id && mongoose.Types.ObjectId.isValid(id);

  // If both senderId and receiverId are provided, build a complex query
  if (
    isValidObjectId(interestId) &&
    isValidObjectId(senderId) &&
    isValidObjectId(receiverId)
  ) {
    query = {
      $or: [
        { _id: new mongoose.Types.ObjectId(interestId) },
        {
          senderId: new mongoose.Types.ObjectId(senderId),
          receiverId: new mongoose.Types.ObjectId(receiverId),
        },
        {
          senderId: new mongoose.Types.ObjectId(receiverId), // Swapped sender/receiver
          receiverId: new mongoose.Types.ObjectId(senderId), // Swapped sender/receiver
        },
      ],
    };
  }
  // If only interestId is provided, build a simple query for that
  else if (isValidObjectId(interestId)) {
    query = { _id: new mongoose.Types.ObjectId(interestId) };
  }
  // If both senderId and receiverId are provided, check for both directions
  else if (isValidObjectId(senderId) && isValidObjectId(receiverId)) {
    query = {
      $or: [
        {
          senderId: new mongoose.Types.ObjectId(senderId),
          receiverId: new mongoose.Types.ObjectId(receiverId),
        },
        {
          senderId: new mongoose.Types.ObjectId(receiverId), // Swapped condition
          receiverId: new mongoose.Types.ObjectId(senderId), // Swapped condition
        },
      ],
    };
  }

  return query;
};
