import mongoose, { model, models, Schema, Document } from "mongoose";

export interface IExpectations extends Document {
  jaadhagam: string;
  marital_status: string;
  working_place: string;
  expecting_stars: string;
  expectation_info: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const ExpectationsSchema = new Schema<IExpectations>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    jaadhagam: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    marital_status: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    working_place: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    expecting_stars: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    expectation_info: {
      type: String,
      required: false,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id; // Optionally remove _id from the returned JSON
      },
    },
  }
);

const Expectations =
  models.Expectations ||
  model<IExpectations>("Expectations", ExpectationsSchema);

export default Expectations;
