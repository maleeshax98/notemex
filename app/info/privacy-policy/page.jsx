import React from "react";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-16 p-4 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          <p className="mb-6">Last updated - 2023/12/05</p>

          <p className="mb-6">
            Welcome to Notemex, the platform for sharing educational notes.
            Protecting your privacy is essential to us. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you use Notemex.
          </p>

          <h2 className="text-2xl font-bold mb-4">Information We Collect:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              Personal information provided during the account creation process,
              including your name and email address.
            </li>
            <li>
              Transaction information when you purchase or sell notes on
              Notemex.
            </li>
            <li>User-generated content, such as notes and comments.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            How We Use Your Information:
          </h2>
          <ul className="mb-6 list-disc list-inside">
            <li>To facilitate note purchases and sales on the platform.</li>
            <li>
              To communicate with you regarding your account, transactions, and
              platform updates.
            </li>
            <li>To enhance and personalize your experience on Notemex.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Information Sharing:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>We do not sell your personal information to third parties.</li>
            <li>
              We may share your information with trusted service providers who
              assist us in operating the platform and processing transactions.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Data Security:</h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              We implement security measures to protect your information from
              unauthorized access or disclosure.
            </li>
            <li>
              While we take precautions, no online platform can guarantee
              absolute security.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            Cookies and Tracking Technologies:
          </h2>
          <ul className="mb-6 list-disc list-inside">
            <li>
              We use cookies to enhance your browsing experience on Notemex.
            </li>
            <li>
              You can manage cookie preferences through your browser settings.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            Changes to the Privacy Policy:
          </h2>
          <p className="mb-6">
            We reserve the right to update this Privacy Policy. Changes will be
            posted on this page with a revised "last updated" date.
          </p>

          <h2 className="text-2xl font-bold mb-4">Contact Us:</h2>
          <p className="mb-6">
            If you have questions about our Privacy Policy or how we handle your
            information, contact us at{" "}
            <a href="mailto:privacy.notemex@gmail.com" className="text-blue-500">
              privacy.notemex@gmail.com
            </a>
            .
          </p>

          {/* <p className="text-gray-500">
            (Note: This Privacy Policy is specific to the Notemex platform and
            its features.)
          </p> */}
        </div>
      </div>
    </div>
  );
}
