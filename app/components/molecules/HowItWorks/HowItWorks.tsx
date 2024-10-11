export const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-white py-16 px-10">
      {/* Background gradient and spacing for the section */}
      <div className="max-w-7xl mx-auto text-center px-6 md:px-0">
        <h2 className="text-5xl font-bold text-gray-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Step 1 - Register */}
          <div className="p-8 bg-white shadow-2xl rounded-xl">
            <div className="text-indigo-500 mb-6">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Register
            </h3>
            <p className="text-gray-600">
              Quickly sign up, fill in your details, and join the community.
              It's fast and simple!
            </p>
          </div>

          {/* Step 2 - Send Interest */}
          <div className="p-8 bg-white shadow-2xl rounded-xl">
            <div className="text-red-500 mb-6">
              <span className="text-5xl">❤️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Send Interest
            </h3>
            <p className="text-gray-600">
              Found someone you like? Express your interest with a quick
              notification.
            </p>
          </div>

          {/* Step 3 - Interest Accepted */}
          <div className="p-8 bg-white shadow-2xl rounded-xl">
            <div className="text-green-500 mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Interest Accepted
            </h3>
            <p className="text-gray-600">
              Once they accept, you're one step closer to building a meaningful
              connection.
            </p>
          </div>

          {/* Step 4 - Chat */}
          <div className="p-8 bg-white shadow-2xl rounded-xl">
            <div className="text-blue-500 mb-6">
              <span className="text-5xl">💬</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Chat
            </h3>
            <p className="text-gray-600">
              Now it's time to chat! Get to know each other better. Once you
              feel comfortable, you can use their mobile number to reach out
              directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
