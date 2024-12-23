import mongoose, { model, models, Schema, Document } from "mongoose";

export interface IContactInfo extends Document {
  mobile: string;
  sameAsMobile: boolean;
  whatsapp: string;
  country: string;
  state: string;
  district: string;
  address: string;
  photo: string;
  pin_code: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15, // Adjust based on possible mobile number length
    },
    sameAsMobile: {
      type: Boolean,
      required: true,
      default: false, // Default value for the checkbox
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15, // Adjust based on possible WhatsApp number length
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Adjust based on country names
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Adjust based on state names
    },
    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Adjust based on district names
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, // Adjust based on expected address length
    },
    photo: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500, // Adjust based on file path or URL length
    },
    pin_code: {
      type: Number,
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

const ContactInfo =
  models.ContactInfo || model<IContactInfo>("ContactInfo", ContactInfoSchema);

export default ContactInfo;
