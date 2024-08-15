import React from "react";
import "./AccessDeniedModal.css";

const AccessDeniedModal: React.FC = () => {
  return (
    <div className="age-verification-modal">
      <div className="modal-content">
        <h2>WE&apos;RE SORRY!</h2>
        <p>You must be 18 years of age or older to enter this site.</p>
        <p>
          If you believe you&apos;re seeing this in error, please clear your cache.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedModal;
