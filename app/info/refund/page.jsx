import React from "react";

function Refund() {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-16 p-4 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
          <p className="mb-6">
            Thank you for using Notemex, the platform for sharing educational
            notes. We appreciate your commitment to academic excellence. This
            Refund Policy outlines our guidelines for refunds to ensure a
            positive experience for all users.
          </p>

          <h2 className="text-2xl font-bold mb-4">Refund Eligibility:</h2>
          <p className="mb-6">
            We do not provide refunds for note purchases on Notemex. As notes
            are digital and instantly accessible upon purchase, we encourage
            users to carefully review the details and samples provided by the
            note creator before making a purchase decision.
          </p>

          <h2 className="text-2xl font-bold mb-4">Note Quality:</h2>
          <p className="mb-6">
            Note creators on Notemex are responsible for the accuracy and
            quality of their content. If you encounter any issues with the
            content, we recommend reaching out to the note creator directly for
            clarification or resolution. If you need to get contact details
            about the note owner, you can contact us.
          </p>

          <h2 className="text-2xl font-bold mb-4">Technical Issues:</h2>
          <p className="mb-6">
            If you experience technical issues accessing or downloading
            purchased notes, please contact our support team at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            . We will promptly investigate and address any technical issues to
            ensure you receive the notes you&quot;ve purchased.
          </p>

          <h2 className="text-2xl font-bold mb-4">Unauthorized Purchases:</h2>
          <p className="mb-6">
            If you suspect unauthorized activity on your account leading to note
            purchases, please contact our support team immediately. We will
            investigate and take appropriate action to secure your account.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Cancellation of Note Sales:
          </h2>
          <p className="mb-6">
            Note creators may choose to remove their notes from Notemex at any
            time. If a note you have purchased becomes unavailable due to the
            creator&quot;s action, you may contact our support team for assistance.
          </p>

          <h2 className="text-2xl font-bold mb-4">Contact Us:</h2>
          <p className="mb-6">
            If you have any questions or concerns regarding our refund policy,
            please reach out to our customer support team at{" "}
            <a href="mailto:support.notemex@gmail.com" className="text-blue-500">
              support.notemex@gmail.com
            </a>
            . We are here to assist you and ensure a seamless experience on
            Notemex.
          </p>

          {/* <p className="text-gray-500">
            (Note: This Refund Policy is specific to the Notemex platform and
            its features.)
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Refund;
