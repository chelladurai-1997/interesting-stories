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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
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

  // Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  // Get the current page's problems
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination navigation handler
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 mx-auto">
      <div className="min-h-screen bg-gray-100 p-2">
        <h1 className="text-2xl font-bold text-center mb-6">
          Problem List ({filteredProblems.length})
        </h1>

        {/* Filter section */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <select
            className="border p-2 rounded w-full md:w-auto"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            className="border p-2 rounded w-full md:w-auto overflow-y-auto max-h-48"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">All Companies</option>
            {Object.values(companies).map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <p className="text-center mb-6 text-gray-400">
          Showing page {currentPage} of {totalPages}
        </p>

        {/* Problems list for current page */}
        <ProblemsList problems={paginatedProblems} />

        {/* Pagination controls */}
        <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* First 5 pages */}
          {[...Array(5)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Ellipsis if more than 10 total pages and we are past the 5th page */}
          {totalPages > 10 && currentPage > 5 && (
            <span className="px-2 text-gray-400">...</span>
          )}

          {/* Current page if it's in the middle */}
          {totalPages > 10 &&
            currentPage > 5 &&
            currentPage <= totalPages - 5 && (
              <button
                className="px-3 py-1 rounded bg-blue-500 text-white"
                onClick={() => handlePageChange(currentPage)}
              >
                {currentPage}
              </button>
            )}

          {/* Ellipsis if more than 10 total pages and we're not yet near the end */}
          {totalPages > 10 && currentPage < totalPages - 4 && (
            <span className="px-2 text-gray-400">...</span>
          )}

          {/* Last 5 pages */}
          {totalPages > 5 &&
            [...Array(5)].map((_, i) => {
              const page = totalPages - 4 + i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => {
              handlePageChange(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
