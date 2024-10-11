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
            <li>✅ Register Your Profile</li>
            <li>✅ Manual Verification Call</li>
            <li>✅ Send Unlimited Interests</li>
            <li>✅ Send Unlimited Messages</li>
            <li>✅ Unlimted Accept or Reject Profiles Freely</li>
            <li>✅ View Contact Details After Acceptance</li>
            <li>✅ Get Visitor Insights</li>
          </ul>
        </div>

        {/* Paid Services Card */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">
            💼 Paid Support
          </h3>
          <ul className="text-left text-gray-700 space-y-3">
            <li>🤝 Arrange Visits & Facilitate Communication</li>
            <li>📝 Manage All Your Communications</li>
            <li>📅 Schedule Visits & Conduct Verifications</li>
            <li>💰 Flexible Payment Options</li>
            <li>✅ Ensure Genuine Interactions</li>
            <li>
              📱 WhatsApp Support:{" "}
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
