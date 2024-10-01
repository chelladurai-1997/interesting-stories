import mongoose, { model, models, Schema, Document } from "mongoose";

// Define the possible statuses for the interest
export enum InterestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

// Define the interface for the Interest schema
export interface IInterest extends Document {
  senderId: mongoose.Schema.Types.ObjectId; // User ID of the sender (stored as a string)
  receiverId: mongoose.Schema.Types.ObjectId; // User ID of the receiver (stored as a string)
  status: InterestStatus; // Status of the interest
  createdAt: Date; // Timestamp of when the interest was sent
}

// Create the Interest schema
const InterestSchema = new Schema<IInterest>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(InterestStatus), // Ensures status is one of the predefined values
      default: InterestStatus.PENDING, // Default status is pending
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Check if the Interest model already exists in Mongoose models cache
const Interests =
  models.Interests || model<IInterest>("Interests", InterestSchema);

export default Interests;
