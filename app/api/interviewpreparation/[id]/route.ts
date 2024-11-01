import connectMongo from "@/app/lib/constants/mongodb";
import { NextResponse } from "next/server";
import { handleServerError } from "@/app/lib/utils/handleServerError";
import Questions, { IQuestion } from "@/app/lib/models/interviewprep.model";

// Handler to delete a specific question by id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (!params?.id) {
    return NextResponse.json(
      { message: "id is required for deletion", error: true },
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const deletedQuestion = await Questions.findOneAndDelete({ _id: id });

    if (!deletedQuestion) {
      return NextResponse.json(
        { message: "Question not found", error: true },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Question deleted successfully",
        data: deletedQuestion,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}
