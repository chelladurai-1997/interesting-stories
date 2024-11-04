"use client";
import { FC, useEffect, useState } from "react";
import {
  XMarkIcon,
  ClipboardIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddQuestionModal from "@/app/components/organism/AddQuestionModal/AddQuestionModal";

// Define the Question interface
interface Question {
  _id: string;
  question: string;
  answer: string;
  codeExample: string;
}

const LandingScreen: FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sampleFormatPrompt = `
  Please provide a response in the following format for the topic or question I give you:
  
  \`\`\`json
  {
    "question": "<Your Question>",
    "answer": "<Concise, straight-to-the-point answer explaining the concept in a spoken manner like in interview, explain like 10 year experienced developer>",
    "codeExample": "<Example code demonstrating the concept and dont use tripple backtics>", 
    "topicName": "<Relevant Topic>"
  }
  \`\`\`
  
  The topic or question I want to ask is: "<Your Topic or Question>".
  `;

  // Example usage
  const topicOrQuestion = "What are JavaScript data types?";
  const formattedPrompt = sampleFormatPrompt.replace(
    "<Your Topic or Question>",
    topicOrQuestion
  );

  console.log(formattedPrompt);

  // Fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/interviewpreparation");
      const data = await response.json();
      setQuestions(data?.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to add a new question
  const addQuestion = async (newQuestion: Question) => {
    try {
      const response = await fetch("/api/interviewpreparation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);

      // Update questions state to include the newly added question
      setQuestions((prevQuestions) => [...prevQuestions, data.data]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Function to delete a question
  const deleteQuestion = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/interviewpreparation/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.error) throw new Error(data.message);

      // Update questions state to remove the deleted question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== id)
      );
      setSelectedQuestion(null); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="p-6 bg-[#1e1e1e] min-h-screen text-[#d4d4d4]">
      <h1 className="text-3xl font-bold mb-4 text-[#d7ba7d]">
        Happy Preparing!
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-[#d7ba7d] text-[#1e1e1e] px-4 py-2 rounded"
      >
        Add New Question
      </button>
      {/* New button to copy sample format prompt */}
      <button
        onClick={() => handleCopy(sampleFormatPrompt)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Copy Sample Prompt
      </button>
      <ul className="space-y-3">
        {questions?.map((question) => (
          <li
            key={question._id}
            className="p-4 bg-[#252526] rounded shadow-lg hover:bg-[#3c3c3c] transition duration-200 cursor-pointer"
            onClick={() => setSelectedQuestion(question)}
          >
            <span className="text-xl font-medium text-[#9cdcfe]">
              {question.question}
            </span>
          </li>
        ))}
      </ul>

      {/* Fullscreen Popup */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-lg w-full h-screen max-w-2xl overflow-y-auto relative">
            <button
              onClick={() => setSelectedQuestion(null)}
              className="absolute top-4 right-4 text-[#d4d4d4] text-xl"
            >
              <XMarkIcon className="h-6 w-6 text-[#d4d4d4] hover:text-red-500 transition" />
            </button>
            <h2 className="text-2xl font-bold text-[#d7ba7d] mb-4">
              {selectedQuestion.question}
            </h2>
            <p className="mb-4 text-[#d4d4d4]">{selectedQuestion.answer}</p>
            <h3 className="text-xl font-semibold text-[#9cdcfe] mb-2">
              Code Example
            </h3>
            <pre className="bg-[#252526] p-4 rounded text-[#d4d4d4] overflow-auto mb-4 relative">
              <code>{selectedQuestion.codeExample}</code>
              <button
                onClick={() => handleCopy(selectedQuestion.codeExample)}
                className="absolute top-2 right-2 text-[#d7ba7d] hover:text-[#ffd700] transition"
              >
                <ClipboardIcon className="h-6 w-6 text-[#d4d4d4] hover:text-green-500 transition" />
              </button>
            </pre>
            <button
              onClick={() => deleteQuestion(selectedQuestion?._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              <TrashIcon className="h-4 w-4 inline" /> Delete Question
            </button>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddQuestion={addQuestion}
      />
    </div>
  );
};

export default LandingScreen;
