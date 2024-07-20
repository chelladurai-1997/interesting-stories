// app/components/Tabs.js
"use client";
import { useState } from "react";
import StoryList from "./storyList";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const allStories = [
    {
      id: "1",
      name: "Tuesdays with Professor Raman",
      author: "Muthu",
      storyText: `
            Muthu was a dedicated journalist living in Chennai. Years ago, he was a student at Madurai University, where he had a favorite professor named Professor Raman. Professor Raman was wise and kind, always encouraging his students to think deeply about life.
    
            Years passed, and Muthu got busy with his career, losing touch with his beloved professor. One evening, while watching TV, Muthu saw a feature about Professor Raman. The professor was now very sick with a disease called ALS, which made it hard for him to move or speak.
    
            Moved by the sight of his old mentor, Muthu decided to visit Professor Raman in Madurai. They hadn't seen each other in years, but when Muthu walked into the room, it felt like no time had passed. They hugged, and Muthu promised to visit every Tuesday to learn from his old teacher once more.
    
            Every Tuesday, Muthu would travel from Chennai to Madurai to sit with Professor Raman. They talked about many things:
    
            1. **The World:** Professor Raman said people are often too busy to see what really matters. He believed that understanding and kindness should be more important than wealth or status.
    
            2. **Feeling Sorry for Yourself:** The professor admitted he had moments of sadness because of his illness, but he focused on the joy of spending time with loved ones.
    
            3. **Regrets:** He told Muthu to live a life true to himself, so he wouldn’t have regrets later. He said it's important to do what makes you happy.
    
            4. **Death:** Professor Raman wasn’t afraid of death. He said that thinking about death helps you live better because you realize what is truly important.
    
            5. **Family:** He emphasized that family gives us strength and love. He shared stories about his wife, children, and grandchildren.
    
            6. **Emotions:** The professor advised Muthu to embrace his feelings fully, whether they were happy or sad, because that’s how you truly experience life.
    
            7. **Fear of Aging:** Professor Raman believed that aging is a gift. Each stage of life has its own beauty and wisdom.
    
            8. **Money:** He said that money can't buy happiness. What really matters are relationships and the love we share with others.
    
            9. **How Love Goes On:** Even after we’re gone, the love we gave to others continues. It’s the memories and the impact we have on people that last.
    
            10. **Marriage:** Professor Raman spoke about his long marriage and how love, respect, and communication are key to a happy relationship.
    
            11. **Culture:** He felt that society often values the wrong things. Instead of chasing success, we should create a culture of love and kindness.
    
            12. **Forgiveness:** Forgiveness, both of others and ourselves, is essential for peace of mind.
    
            13. **A Perfect Day:** For Professor Raman, a perfect day was simple – spending time with loved ones, enjoying nature, and having meaningful conversations.
    
            As the weeks went by, Professor Raman's health got worse, but his spirit remained strong. Muthu learned so much from these visits and started seeing life differently. He realized that the lessons from Professor Raman were treasures that would guide him forever.
    
            One Tuesday, Muthu arrived to find Professor Raman had passed away. It was a sad day, but Muthu felt grateful for all the wisdom his mentor had shared. He knew that the professor’s teachings would stay with him always.
    
            Muthu’s time with Professor Raman taught him to live with purpose, cherish relationships, and focus on what truly matters. It was a reminder that life’s greatest lessons often come from the heart.
        `,
    },
    { name: "Secrets of the Ocean", author: "Jane Smith", id: 3 },
  ];

  const readLaterStories = [
    { name: "Secrets of the Ocean", author: "Jane Smith", id: 3 },
  ];

  const getStories = () => {
    switch (activeTab) {
      case "All":
        return allStories;
      case "ReadLater":
        return readLaterStories;
      default:
        return [];
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-wrap border-b border-gray-200">
        <div
          onClick={() => setActiveTab("All")}
          className={`flex-1 text-center py-3 cursor-pointer ${
            activeTab === "All"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600"
          } sm:flex-none sm:w-1/2`}
        >
          All
        </div>
        <div
          onClick={() => setActiveTab("ReadLater")}
          className={`flex-1 text-center py-3 cursor-pointer ${
            activeTab === "ReadLater"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600"
          } sm:flex-none sm:w-1/2`}
        >
          Read Later
        </div>
      </div>
      <div className="p-4">
        <StoryList stories={getStories()} />
      </div>
    </div>
  );
};

export default Tabs;
