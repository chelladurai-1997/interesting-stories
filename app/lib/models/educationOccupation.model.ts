import { model, models, Schema, Document } from "mongoose";

export interface IEducationOccupation extends Document {
  education: string;
  educationInfo: string;
  occupation: string;
  occupationInfo: string;
  workingPlace: string;
  monthlyIncome: string;
  userId: string;
}

const EducationOccupationSchema = new Schema<IEducationOccupation>(
  {
    userId: { type: String, required: true },
    education: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    educationInfo: {
      type: String,
      required: false, // Optional field
      maxlength: 500,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    occupationInfo: {
      type: String,
      required: false, // Optional field
      maxlength: 500,
    },
    workingPlace: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    monthlyIncome: {
      type: String,
      required: true,
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

const EducationOccupation =
  models.EducationOccupation ||
  model<IEducationOccupation>("EducationOccupation", EducationOccupationSchema);
export default EducationOccupation;