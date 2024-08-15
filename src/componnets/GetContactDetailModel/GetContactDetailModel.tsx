import React, { Dispatch, SetStateAction, useState } from "react";
import "./GetContactDetailModel.css";

interface GetContactDetailModelProps {
  onConfirm: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const GetContactDetailModel: React.FC<GetContactDetailModelProps> = ({
  onConfirm,
  email,
  setEmail,
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="getContactDetail-modal">
      <div className="modal-content">
        <div className="h-12 w-28">
          <img
            src="https://www.booker.co.uk/images/ShopLocallyLogo.jpg"
            className="h-full w-full"
          />
        </div>
        <h2>Enter your contact information here..</h2>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          className="email-input"
        />
        <div className="modal-actions">
          <button className="submit-button" onClick={onConfirm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetContactDetailModel;
