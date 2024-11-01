import mongoose, { model, models, Schema, Document } from "mongoose";

// Define the interface for the Question schema
export interface IQuestion extends Document {
  _id: mongoose.Types.ObjectId; // Automatically generated unique ID
  question: string;
  answer: string;
  codeExample?: string;
  topicName: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer text is required"],
      trim: true,
    },
    codeExample: {
      type: String,
      trim: true,
    },
    topicName: {
      type: String,
      required: [true, "Topic name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Questions =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default Questions;
