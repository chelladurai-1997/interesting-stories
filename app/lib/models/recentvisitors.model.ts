import mongoose, { model, models, Schema, Document } from "mongoose";
import User from "./user.model";

// Define the interface for the RecentVisitor schema
export interface IRecentVisitor extends Document {
  visitorId: mongoose.Schema.Types.ObjectId; // User ID of the visitor
  profileOwnerId: mongoose.Schema.Types.ObjectId; // User ID of the profile owner
  visitedAt: Date; // Timestamp of the visit
}

// Create the RecentVisitor schema
const RecentVisitorSchema = new Schema<IRecentVisitor>(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User.collection.name, // Reference to the User model
    },
    profileOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User.collection.name, // Reference to the User model
    },
    visitedAt: {
      type: Date,
      default: Date.now, // Automatically set to current date/time
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Check if the RecentVisitor model already exists in Mongoose models cache
const RecentVisitors =
  models.RecentVisitors ||
  model<IRecentVisitor>("RecentVisitors", RecentVisitorSchema);

export default RecentVisitors;
