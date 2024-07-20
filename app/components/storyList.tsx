// app/components/StoryList.js
"use client";
import { useRouter } from "next/navigation";

const StoryList = ({ stories }) => {
  const router = useRouter();

  const handleStoryClick = (id) => {
    router.push(`/stories/${id}`);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Stories</h2>
      <ul className="space-y-4">
        {stories.length === 0 ? (
          <li className="text-gray-500">No stories available</li>
        ) : (
          stories.map((story) => (
            <li
              key={story.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <div className="text-lg font-semibold">{story.name}</div>
                <div className="text-gray-600">by {story.author}</div>
              </div>
              <button
                onClick={() => handleStoryClick(story.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Read
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StoryList;
