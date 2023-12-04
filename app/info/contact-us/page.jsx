import React from "react";

export default function ContactUs() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-16 p-4 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

          <p className="mb-6">
            Thank you for reaching out to Notemex, the platform for sharing
            educational notes. We value your feedback, questions, and
            suggestions. Please use the following contact information to get in
            touch with us:
          </p>

          <h2 className="text-2xl font-bold mb-4">Customer Support:</h2>
          <p className="mb-6">
            For general inquiries, account assistance, or technical support,
            please email our customer support team at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mb-4">Note Creator Support:</h2>
          <p className="mb-6">
            If you are a note creator and have questions about selling or
            managing your notes on Notemex, please contact our creator support
            team at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mb-4">Business Inquiries:</h2>
          <p className="mb-6">
            For business-related inquiries, partnerships, or collaborations,
            please reach out to our business development team at{" "}
            <a href="mailto:business.notemex@gmail.com" className="text-blue-500">
              business.notemex@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mb-4">Privacy Concerns:</h2>
          <p className="mb-6">
            If you have concerns or questions about your privacy on Notemex,
            please contact our privacy team at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mb-4">Feedback and Suggestions:</h2>
          <p className="mb-6">
            We welcome your feedback and suggestions to improve Notemex. Feel
            free to share your thoughts with us at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mb-4">Report Issues:</h2>
          <p className="mb-6">
            To report technical issues, violations of terms, or any other
            problems on the platform, please email us at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            .
          </p>

          <p className="mb-6">
            Please allow up to 7 business days for a response. We appreciate
            your patience and look forward to assisting you.
          </p>

          {/* <p className="text-gray-500">
            (Note: This Contact Us information is specific to the Notemex
            platform and its features.)
          </p> */}
        </div>
      </div>
    </div>
  );
}
