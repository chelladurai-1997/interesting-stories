export const HowItWorks = () => {
  const steps = [
    {
      title: "1. Sending Interest",
      description:
        "You can send interest to other users you're interested in. If they haven't previously declined your request, the interest will be sent successfully.",
      icon: "🔗", // Replace with an appropriate icon or image
    },
    {
      title: "2. Accepting Interest",
      description:
        "When a user receives your interest, they can either accept or decline it. If accepted, both of you will have established a mutual interest and can move forward.",
      icon: "✅", // Replace with an appropriate icon or image
    },
    {
      title: "3. Sharing Contact Information",
      description:
        "After mutual interest is established, sharing contact details is optional. During registration, you can choose to share contact info right away or keep it private until you're ready.",
      icon: "📞", // Replace with an appropriate icon or image
    },
    {
      title: "4. Chat to Know Each Other",
      description:
        "Once mutual interest is established, the chat feature will be enabled. You can now message each other directly on the platform to get to know one another better before deciding to share contact details.",
      icon: "💬", // Replace with an appropriate icon or image
    },
    {
      title: "5. Declining Interest",
      description:
        "If someone declines your interest, you won’t be able to send another. However, they can still reconsider and change their decision to accept your interest at any point of time, even after declining it.",
      icon: "🚫", // Replace with an appropriate icon or image
    },
  ];

  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Section Title */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        How It Works
      </h2>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-start transition-transform transform hover:scale-105"
          >
            <div className="text-3xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
