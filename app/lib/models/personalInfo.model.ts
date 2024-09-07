import { model, models, Schema, Document } from "mongoose";

export interface IPersonalDetails extends Document {
  religion: string;
  caste: string;
  kulam: string;
  kula_deivam: string;
  height: string;
  complexion: string;
  weight: string;
  blood_group: string;
  physically_challenged: boolean;
  physical_challenge_details?: string; // Optional field
  userId: string;
}

const PersonalDetailsSchema = new Schema<IPersonalDetails>(
  {
    userId: { type: String, required: true },
    religion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    caste: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    kulam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    kula_deivam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    height: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    complexion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    weight: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    blood_group: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },
    physically_challenged: {
      type: Boolean,
      required: true,
    },
    physical_challenge_details: {
      type: String,
      required: false, // Optional field
      trim: true,
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

const PersonalDetails =
  models.PersonalDetails ||
  model<IPersonalDetails>("PersonalDetails", PersonalDetailsSchema);
export default PersonalDetails;
