import mongoose, { model, models, Schema, Document } from "mongoose";

// ChatMessage Schema (separate collection)
export interface IChatMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId; // User ID of the sender
  receiverId: mongoose.Schema.Types.ObjectId; // User ID of the receiver
  message: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Ensures the receiverId is provided
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const ChatMessages =
  models.ChatMessages || model<IChatMessage>("ChatMessages", ChatMessageSchema);
export default ChatMessages;
