"use client";
import React from "react";

interface TermsConditionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsConditionsPopup: React.FC<TermsConditionsPopupProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      {" "}
      {/* Increased z-index */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full relative z-[10000]">
        {" "}
        {/* Ensure content inside the popup is also layered correctly */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h2>
        <div className="text-gray-700 mb-4 h-64 overflow-y-auto">
          <p className="mb-2">
            1. <strong>Eligibility</strong>: By registering on this platform,
            users must be at least 18 years old. For matrimonial services, users
            must be at least 21 years old for males and 18 years old for females
            as per Indian law.
          </p>
          <p className="mb-2">
            2. <strong>User Responsibilities</strong>: Users are responsible for
            the accuracy of the information they provide. Any false, misleading,
            or fraudulent information may result in account suspension or
            permanent termination.
          </p>
          <p className="mb-2">
            3. <strong>Privacy</strong>: We are committed to protecting your
            privacy. Your personal information will only be shared with other
            users with whom you initiate contact or as required by law. We
            adhere to the{" "}
            <em>
              Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules, 2011
            </em>{" "}
            under Indian law.
          </p>
          <p className="mb-2">
            4. <strong>Termination</strong>: We reserve the right to terminate
            or suspend any account that violates these terms and conditions,
            engages in abusive behavior, or uses the platform for illegal
            activities.
          </p>
          <p className="mb-2">
            5. <strong>Prohibited Content</strong>: Users are strictly
            prohibited from uploading, posting, or transmitting any content that
            is defamatory, offensive, or otherwise illegal under Indian laws
            such as the <em>Information Technology Act, 2000</em>.
          </p>
          <p className="mb-2">
            6. <strong>Intellectual Property</strong>: All content, including
            logos, text, and design, is protected under Indian intellectual
            property laws. Users may not use the platform's content without
            express written permission.
          </p>
          <p className="mb-2">
            7. <strong>Governing Law</strong>: This agreement is governed by and
            construed in accordance with the laws of India. Any disputes arising
            from the use of this platform will be subject to the jurisdiction of
            courts located in [City, State].
          </p>
          <p className="mb-2">
            8. <strong>Disputes</strong>: Any disputes between users should be
            resolved amicably. The platform is not liable for any personal
            disputes arising between users. In case of legal disputes, both
            parties should adhere to Indian laws and procedures.
          </p>
          <p className="mb-2">
            9. <strong>Refund and Cancellation</strong>: Payments made for
            premium features are non-refundable unless explicitly mentioned.
            Cancellation of services must comply with our refund policy.
          </p>
          <p className="mb-2">
            10. <strong>Amendments</strong>: The platform reserves the right to
            amend these terms and conditions at any time. Continued use of the
            platform implies acceptance of the revised terms.
          </p>
          <p className="mb-2">
            11. <strong>Consent to Communications</strong>: By using this
            platform, you agree to receive communications from us, including SMS
            and email notifications regarding platform activity.
          </p>
          <p className="mb-2">
            12. <strong>Data Retention</strong>: We retain user data for as long
            as necessary to provide our services or comply with legal
            obligations. Users may request deletion of their data under the{" "}
            <em>Information Technology Rules, 2011</em>.
          </p>
          <p className="mb-2">
            13. <strong>Indemnification</strong>: Users agree to indemnify and
            hold the platform harmless from any claims, damages, or liabilities
            resulting from their actions or the information they provide.
          </p>
          <p className="mb-2">
            14. <strong>Third-Party Services</strong>: The platform may use
            third-party services to enhance user experience. We are not liable
            for any issues that arise from the use of these services.
          </p>
          <p className="mb-2">
            15. <strong>Force Majeure</strong>: The platform shall not be held
            responsible for any delay or failure to comply with obligations
            under these terms due to unforeseen circumstances, such as natural
            disasters or government regulations.
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition"
            onClick={onClose}
            type="button"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPopup;
