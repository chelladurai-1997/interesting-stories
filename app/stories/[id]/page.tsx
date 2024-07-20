// app/stories/[id]/page.js
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StoryDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [story, setStory] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/stories/${id}`)
        .then((response) => response.json())
        .then((data) => setStory(data))
        .catch((error) => console.error("Error fetching story:", error));
    }
  }, [id]);

  const handleNavigate = (direction) => {
    if (story) {
      const newId = direction === "prev" ? story.prevId : story.nextId;
      if (newId) {
        router.push(`/stories/${newId}`);
      }
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <button
        onClick={() => router.push("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mt-4 mb-2">{story.name}</h2>
      <h3 className="text-xl font-semibold mb-4">by {story.author}</h3>

      <p className="text-gray-800 whitespace-break-spaces">{story.storyText}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleNavigate("prev")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          disabled={!story.prevId}
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigate("next")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          disabled={!story.nextId}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryDetailPage;
