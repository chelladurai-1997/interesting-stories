import { model, models, Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  gender: "Male" | "Female" | "Other";
  dob: Date;
  profile_created_by: "Parent" | "Sibling" | "Guardian" | "Myself";
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  children: string;
  children_living_status: string;
  profile_bio: string;
  userId: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
      minlength: 3, // Ensures name has at least 3 characters
      maxlength: 100, // Sets a maximum length
    },
    userId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      //   enum: ["Male", "Female", "Other"], // Limits gender to specific values
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Date of birth cannot be in the future.",
      },
    },
    profile_created_by: {
      type: String,
      required: true,
      //   enum: ["Parent", "Sibling", "Guardian", "Myself"], // Limits to predefined options
    },
    marital_status: {
      type: String,
      required: true,
      //   enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    children: {
      type: String,
      required: true,
    },
    children_living_status: {
      type: String,
      required: true,
    },
    profile_bio: {
      type: String,
      required: true,
      maxlength: 500, // Limit bio length
      set: (bio: string) => bio.replace(/<[^>]+>/g, ""), // Basic sanitization to remove HTML tags
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id; // Optionally remove _id from the returned JSON
      },
    },
  }
);

const BasicInformation =
  models.BasicInformation || model<IProfile>("BasicInformation", ProfileSchema);
export default BasicInformation;
