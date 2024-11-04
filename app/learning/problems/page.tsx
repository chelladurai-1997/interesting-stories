"use client";
import React, { useState } from "react";
import Link from "next/link";
import { problems } from "./data";
import UsefulLinks from "@/app/components/organism/UsefulLinks/UsefulLinks";
import toast from "react-hot-toast";

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
  onCardClick: (title: string) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onCardClick }) => {
  // Step 2: Define the copy function
  const copyPromptToClipboard = () => {
    const promptText = `
    Refer leetcode problems;  
    Problem Title: ${problem.title}
    - Tag: ${problem.tag}
    - Difficulty Level: ${problem.difficulty}
    - Average Time Expected to Solve: ${problem.avgTime}
      
    explain the problem first like i am 10 year old kid and provide an optimal solution code using JavaScript for the problem and explain what algorithm used and why and give me the ?
  `;

    navigator.clipboard
      .writeText(promptText)
      .then(() => toast.success(`Prompt copied to clipboard!`))
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

      {/* Mark Complete Button */}
      <button
        onClick={() => onCardClick(problem.title)}
        className="mt-2 ml-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Mark Complete
      </button>
    </div>
  );
};

interface ProblemsListProps {
  problems: Problem[];
  onCardClick: (title: string) => void;
}

const ProblemsList: React.FC<ProblemsListProps> = ({
  problems,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {problems.map((problem, index: number) => (
        <ProblemCard key={index} problem={problem} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

const Page: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleResetFilters = () => {
    setSelectedDifficulty("");
    setSelectedCompany("");
    setSelectedTag("");
    setCurrentPage(1);
  };

  // Check if any filter is active
  const isFilterApplied =
    selectedDifficulty !== "" || selectedCompany !== "" || selectedTag !== "";

  // Extract companies, tags, and difficulties
  const companies: Record<string, string> = {};
  const tags: Record<string, string> = {};
  const difficulties: Record<string, string> = {};

  problems.forEach((problem) => {
    if (problem.company) companies[problem.company] = problem.company;
    if (problem.tag) tags[problem.tag] = problem.tag;
    if (problem.difficulty)
      difficulties[problem.difficulty] = problem.difficulty;
  });

  // Filter problems based on selected filters
  const filteredProblems = problems.filter((problem) => {
    return (
      (selectedDifficulty === "" ||
        problem.difficulty === selectedDifficulty) &&
      (selectedCompany === "" || problem.company === selectedCompany) &&
      (selectedTag === "" || problem.tag === selectedTag)
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
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  const handleCardClick = (title: string) => {};
  return (
    <div className="min-h-screen bg-gray-100 p-2 mx-auto">
      <div className="min-h-screen bg-gray-100 p-2">
        <h1 className="text-2xl font-bold text-center mb-6">
          Problem List ({filteredProblems.length})
        </h1>

        {/* Filter section */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          {/* Difficulty Filter */}
          <select
            className="border p-2 rounded w-full md:w-auto"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value="">All Difficulties</option>
            {Object.values(difficulties).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>

          {/* Company Filter */}
          <select
            className="border p-2 rounded w-full md:w-auto overflow-y-auto max-h-48"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">All Companies</option>
            {Object.values(companies).map((company) => (
              <option key={company} value={company}>
                {company.charAt(0).toUpperCase() + company.slice(1)}
              </option>
            ))}
          </select>

          {/* Tag Filter */}
          <select
            className="border p-2 rounded w-full md:w-auto overflow-y-auto max-h-48"
            value={selectedTag}
            onChange={handleTagChange}
          >
            <option value="">All Tags</option>
            {Object.values(tags).map((tag) => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters link */}
        {isFilterApplied && (
          <div className="flex justify-center mb-6">
            <button
              className="text-blue-500 underline text-sm"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}

        {filteredProblems.length > 0 ? (
          <>
            <p className="text-center mb-6 text-gray-400">
              Showing page {currentPage} of {totalPages}
            </p>
            {/* Problems list for current page */}
            <ProblemsList
              problems={paginatedProblems}
              onCardClick={handleCardClick}
            />

            {/* Pagination controls */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Dropdown for page selection */}
              <select
                className="px-4 py-2 rounded bg-gray-300 text-gray-700"
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </select>

              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={() => {
                  handlePageChange(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500 mt-4">
            No data found
          </p>
        )}
      </div>
      <UsefulLinks />
    </div>
  );
};

export default Page;
