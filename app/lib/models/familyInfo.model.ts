import mongoose, { model, models, Schema, Document } from "mongoose";

export interface IFamilyDetails extends Document {
  fatherName: string;
  fatherStatus: string;
  motherName: string;
  motherStatus: string;
  fatherOccupation: string;
  motherOccupation: string;
  motherKulam: string;
  livingPlace: string;
  nativePlace: string;
  noOfBrothers: number;
  noOfBrothersMarried: number;
  noOfSisters: number;
  noOfSistersMarried: number;
  property: string;
  propertyInfo: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const FamilyDetailsSchema = new Schema<IFamilyDetails>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },

    fatherName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    fatherStatus: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    motherStatus: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    fatherOccupation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    motherOccupation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    motherKulam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    livingPlace: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    nativePlace: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    noOfBrothers: {
      type: Number,
      required: true,
    },
    noOfBrothersMarried: {
      type: Number,
      required: true,
    },
    noOfSisters: {
      type: Number,
      required: true,
    },
    noOfSistersMarried: {
      type: Number,
      required: true,
    },
    property: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    propertyInfo: {
      type: String,
      required: false,
      maxlength: 500,
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

const FamilyDetails =
  models.FamilyDetails ||
  model<IFamilyDetails>("FamilyDetails", FamilyDetailsSchema);
export default FamilyDetails;
