"use client";
import React, { useState } from "react";
import Link from "next/link";
import { problems } from "./data";

interface Problem {
  title: string;
  url: string;
  tag: string;
  difficulty: string;
  avgTime: string;
  company: string;
}

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  // Step 2: Define the copy function
  const copyPromptToClipboard = () => {
    const promptText = `  
    Problem Title: ${problem.title}
    - Tag: ${problem.tag}
    - Difficulty Level: ${problem.difficulty}
    - Average Time Expected to Solve: ${problem.avgTime}
      
    explain the problem first like i am 10 year old kid and provide an optimal solution code using JavaScript for the problem and explain what algorithm used and why?
  `;

    navigator.clipboard
      .writeText(promptText)
      .then(() => alert("Prompt copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-blue-600 mb-2">
        <Link
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-800 transition-colors duration-300"
        >
          {problem.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-700 mb-1">
        Tag: <span className="text-yellow-600 font-medium">{problem.tag}</span>
      </p>
      <p className="text-sm text-gray-700 mb-1">
        Difficulty:{" "}
        <span className="text-red-500 font-medium">{problem.difficulty}</span>
      </p>
      <p className="text-sm text-gray-700 mb-1">
        Average Time:{" "}
        <span className="text-green-600 font-medium">{problem.avgTime}</span>
      </p>
      <p className="text-sm text-gray-700 mb-1">
        Company:{" "}
        <span className="text-teal-500 font-medium capitalize">
          {problem.company}
        </span>
      </p>

      {/* Step 1: Add Copy Button */}
      <button
        onClick={copyPromptToClipboard}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Copy Prompt
      </button>
    </div>
  );
};

interface ProblemsListProps {
  problems: Problem[];
}

const ProblemsList: React.FC<ProblemsListProps> = ({ problems }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {problems.map((problem, index) => (
        <ProblemCard key={index} problem={problem} />
      ))}
    </div>
  );
};

const Page: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const companies: Record<string, string> = {};
  problems.forEach((c) => {
    if (c.company) {
      companies[c.company] = c.company;
    }
  });

  const filteredProblems = problems.filter((problem) => {
    return (
      (selectedDifficulty === "" ||
        problem.difficulty === selectedDifficulty) &&
      (selectedCompany === "" || problem.company === selectedCompany)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Problem List({filteredProblems.length})
      </h1>

      {/* Filter section */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          className="border p-2 rounded"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          <option value="">All Companies</option>
          {Object.values(companies).map((c) => {
            return (
              <option value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            );
          })}
        </select>
      </div>

      <ProblemsList problems={filteredProblems} />
    </div>
  );
};

export default Page;
