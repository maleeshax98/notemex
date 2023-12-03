import React from "react";

export default function TermsAndConditions() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-16 p-4 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Terms and Conditions
          </h1>

          <h2 className="text-2xl font-bold mb-4">Account Registration:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              You must be at least 10 years old to create a Notemex account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account information.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Note Purchases and Sales:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              Users are responsible for the accuracy and quality of notes they
              create and sell on Notemex.
            </li>
            <li>
              Note buyers are encouraged to review samples and details provided
              by creators before making a purchase.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Prohibited Activities:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              Users may not engage in unlawful or unauthorized activities on
              Notemex.
            </li>
            <li>
              Any attempt to manipulate the platform, engage in fraud, or
              violate these terms will result in account suspension.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Intellectual Property:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              Content on Notemex, including notes and user-generated content, is
              protected by intellectual property rights.
            </li>
            <li>
              Users may not use, reproduce, or modify content without proper
              authorization.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            Platform Changes and Termination:
          </h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              We reserve the right to modify or terminate Notemex at any time
              without prior notice.
            </li>
            <li>
              Users will be notified of significant changes affecting their use
              of the platform.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Limitation of Liability:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              Notemex is not liable for direct, indirect, incidental, or
              consequential damages arising from platform use.
            </li>
            <li>
              We make no warranties or representations regarding the quality or
              accuracy of notes on the platform.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Contact Us:</h2>
          <p className="mb-6">
            For questions or concerns about these terms and conditions, contact
            us at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          {/* <p className="text-gray-500">
            (Note: These Terms and Conditions are specific to the Notemex
            platform and its features.)
          </p> */}
        </div>
      </div>
    </div>
  );
}
