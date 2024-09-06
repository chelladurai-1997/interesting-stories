import { model, models, Schema, Document } from "mongoose";

export interface IHoroscopeDetails extends Document {
  raasi: string;
  nachathiram: string;
  lagnam: string;
  dhisaiIrupu: string;
  dhosam: string;
  upload: string; // Assuming this stores the file path or URL
}

const HoroscopeDetailsSchema = new Schema<IHoroscopeDetails>(
  {
    raasi: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50, // Adjust based on possible raasi options
    },
    nachathiram: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50, // Adjust based on possible nachathiram options
    },
    lagnam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50, // Adjust based on possible lagnam options
    },
    dhisaiIrupu: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Adjust based on expected input length
    },
    dhosam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50, // Adjust based on possible dhosam options
    },
    upload: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500, // Adjust based on expected file path length or URL length
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

const HoroscopeInfo =
  models.HoroscopeDetails ||
  model<IHoroscopeDetails>("HoroscopeDetails", HoroscopeDetailsSchema);

export default HoroscopeInfo;
