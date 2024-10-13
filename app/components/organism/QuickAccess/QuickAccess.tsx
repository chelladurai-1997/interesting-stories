const QuickAccess: React.FC = () => (
  <section className="bg-gray-100 py-12 px-10">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Services Card */}
        <div className="bg-green-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">
            🎉 Free Services
          </h3>
          <ul className="text-left text-gray-700 space-y-3">
            <li>✅ Register Your Profile for Free</li>
            <li>
              ✅ Phone verification before profile is displayed in listings
            </li>
            <li>✅ Send Unlimited Interest Requests</li>
            <li>✅ Send Unlimited Messages Once Mutual Interest Is Accepted</li>
            <li>✅ No Limits on Accepting or Rejecting Profiles - It's Free</li>
            <li>
              ✅ Access their contact information if they allow viewing; this is
              also unlimited.
            </li>
            <li>✅ Explore Visitor Insights</li>
          </ul>
        </div>

        {/* Paid Services Card */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">
            💼 Paid Support
          </h3>
          <ul className="text-left text-gray-700 space-y-3">
            <li>
              📅 Set Up Personal Visits and Verify Details of Mutual Interests
            </li>
            <li>🤝 Assisting in Initiating Communication</li>
            <li>📝 Travel with You for Direct Visits and Conversations</li>

            <li>
              💰 Easy Payment Options: Payments are Based on Your Financial
              Capability, as this is Paid Support. You have the flexibility to
              decide what you can afford.
            </li>

            <li>
              ✅ Personal Support Tailored to You, Like a Dedicated Family
              Member
            </li>
            <li>
              📱 WhatsApp me:{" "}
              <a
                href="https://wa.me/6384322665"
                className="text-blue-600 underline"
              >
                +91 6384322665
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-500 mt-8">🎉🎉🎉</p>
    </div>
  </section>
);

export default QuickAccess;
