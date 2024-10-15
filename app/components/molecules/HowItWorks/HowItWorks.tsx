export const HowItWorks = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg ">
      {/* Section Title */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        How It Works
      </h2>

      {/* Step 1: Sending Interest */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          1. Sending Interest
        </h3>
        <p className="text-gray-600 mt-2">
          You can send interest to other users you're interested in. If they
          haven't previously declined your request, the interest will be sent
          successfully.
        </p>
      </div>

      {/* Step 2: Accepting Interest */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          2. Accepting Interest
        </h3>
        <p className="text-gray-600 mt-2">
          When a user receives your interest, they can either accept or decline
          it. If accepted, both of you will have established a mutual interest
          and can move forward.
        </p>
      </div>

      {/* Step 3: Displaying Contact Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          3. Sharing Contact Information
        </h3>
        <p className="text-gray-600 mt-2">
          After mutual interest is established, sharing contact details is
          optional. During registration, you can choose to share contact info
          right away or keep it private until you're ready.
        </p>
      </div>

      {/* Step 4: Enabling Chat */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          4. Chat to Know Each Other
        </h3>
        <p className="text-gray-600 mt-2">
          Once mutual interest is established, the chat feature will be enabled.
          You can now message each other directly on the platform to get to know
          one another better before deciding to share contact details.
        </p>
      </div>

      {/* Step 5: Declining Interest */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          5. Declining Interest
        </h3>
        <p className="text-gray-600 mt-2">
          If someone declines your interest, you won’t be able to send another.
          However, they can still reconsider and change their decision to accept
          your interest at any point of time, even after declining it.
        </p>
      </div>
    </div>
  );
};
