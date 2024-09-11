import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  mobile: string;
  password: string;
  agreeToTermsAndConditions: boolean;
  lastCompletedStep: number;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    lastCompletedStep: { type: Number },
    agreeToTermsAndConditions: { type: Boolean, required: true },
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
