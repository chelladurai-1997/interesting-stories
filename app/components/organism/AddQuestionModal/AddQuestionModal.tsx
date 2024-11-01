import React, { FC, useState } from "react";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (question: any) => void; // Use appropriate type for question
}

const AddQuestionModal: FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onAddQuestion,
}) => {
  const [jsonString, setJsonString] = useState("");

  const handleSubmit = () => {
    try {
      const newQuestion = JSON.parse(jsonString);
      onAddQuestion(newQuestion);
      setJsonString(""); // Clear input after submission
      onClose(); // Close the modal
    } catch (error) {
      alert("Invalid JSON string. Please check your input.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#d7ba7d] mb-4">
          Add a New Question
        </h2>
        <textarea
          className="w-full h-32 p-2 text-[#d4d4d4] bg-[#252526] border border-[#444] rounded mb-4"
          placeholder="Paste your JSON string here..."
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-[#d7ba7d] text-[#1e1e1e] px-4 py-2 rounded mr-2"
            onClick={handleSubmit}
          >
            Add Question
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
