import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  mobile: string;
  password: string;
  agreeToTermsAndConditions: boolean;
  isRegistrationComplete: boolean;
  adminApproved: boolean;
  lastCompletedStep: number;

  completedSections: {
    basicInfo: boolean;
    personalDetails: boolean;
    educationOccupation: boolean;
    horoscope: boolean;
    expectation: boolean;
    familyDetails: boolean;
    contactDetails: boolean;
  };
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    agreeToTermsAndConditions: { type: Boolean, required: true },
    isRegistrationComplete: { type: Boolean, default: false },
    adminApproved: { type: Boolean, default: false },
    lastCompletedStep: { type: Number },

    completedSections: {
      basicInfo: { type: Boolean, default: false },
      personalDetails: { type: Boolean, default: false },
      educationOccupation: { type: Boolean, default: false },
      horoscope: { type: Boolean, default: false },
      expectation: { type: Boolean, default: false },
      familyDetails: { type: Boolean, default: false },
      contactDetails: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.password; // Ensure password is not returned in the JSON
      },
    },
  }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
