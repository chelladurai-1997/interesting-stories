import connectMongo from "@/app/lib/constants/mongodb";
import { NextResponse } from "next/server";
import { handleServerError } from "@/app/lib/utils/handleServerError";
import Questions, { IQuestion } from "@/app/lib/models/interviewprep.model";

// Handler to create a new question
export async function POST(request: Request) {
  const { question, answer, codeExample, topicName } = await request.json();

  try {
    await connectMongo();

    // Instantiate a new Questions model instance, which ensures the correct type
    const newQuestion = new Questions({
      question,
      answer,
      codeExample,
      topicName,
    });

    const savedQuestion = await newQuestion.save();

    return NextResponse.json(
      {
        message: "Question created successfully",
        data: savedQuestion,
        error: false,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}

// Handler to fetch all questions or a specific question by id
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    await connectMongo();

    const query = id ? { id } : {}; // Fetch all if no id provided
    const questions = await Questions.find(query);

    return NextResponse.json(
      {
        message: "Questions fetched successfully",
        data: questions,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}

// Handler to update a specific question by id
export async function PUT(request: Request) {
  const { id, question, answer, codeExample, topicName } = await request.json();

  try {
    await connectMongo();

    const updatedQuestion = await Questions.findOneAndUpdate(
      { id },
      { question, answer, codeExample, topicName },
      { new: true }
    );

    if (!updatedQuestion) {
      return NextResponse.json(
        { message: "Question not found", error: true },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Question updated successfully",
        data: updatedQuestion,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}
