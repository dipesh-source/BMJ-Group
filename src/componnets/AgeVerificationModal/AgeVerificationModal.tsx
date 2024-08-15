import React from "react";
import "./AgeVerificationModal.css";

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="age-verification-modal">
      <div className="modal-content">
        <div className="h-12 w-28">
          <img
            src="https://www.booker.co.uk/images/ShopLocallyLogo.jpg"
            className="h-full w-full"
          />
        </div>
        <h2>Welcome to our Site!</h2>
        <p>
          Are you of the legal drinking age in the country from where you are
          <br />
          accessing this website?
        </p>
        <p>
          By entering this site you agree to:
          <br />
          <br />
          <span className="link">Privacy Policy</span>
          <span className="space">and</span>
          <span className="link">Terms of Service</span>
        </p>
        <div className="modal-actions">
          <button className="continue-button" onClick={onConfirm}>
            Continue
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
        <p className="footer-text">© 2024 bmjgrouplimited, All rights reserved.</p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
