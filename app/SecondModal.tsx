import React, { useState } from "react";

interface SecondModalProps {
  onClose: () => void;
}

const SecondModal: React.FC<SecondModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>(""); // State for error message
  const [showConfirm, setShowConfirm] = useState<boolean>(false); // State to toggle between modal states

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(""); // Clear error when the user types
  };

  const handleCouponClick = () => {
    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Logic to handle coupon claim if email is valid
    console.log("Coupon sent to:", email);
    onClose(); // Close modal after getting the coupon
  };

  const handleNoThankYou = () => {
    setShowConfirm(true); // Show confirmation message
  };

  const handleBackToEmail = () => {
    setShowConfirm(false); // Go back to the email input screen
    setEmail(""); // Clear email input field
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[50vw] max-w-[500px] relative">
        {/* Conditional Rendering Based on State */}
        {!showConfirm ? (
          <>
            {/* Headline */}
            <h2 className="text-2xl font-bold mb-4 text-black">
              We’ll mail you your discount coupon!
            </h2>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email!"
              value={email}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Coupon Button */}
            <button
              onClick={handleCouponClick}
              className="w-[50%] bg-black text-white py-3 rounded-md mb-6 mx-auto"
            >
              GET MY COUPON!
            </button>

            {/* No, Thank You Text */}
            <p
              onClick={handleNoThankYou}
              className="text-sm text-[#857373] cursor-pointer"
            >
              NO, THANK YOU
            </p>
          </>
        ) : (
          <>
            {/* Confirmation Message */}
            <h2 className="text-2xl font-bold mb-4 text-black">
              Are you sure you don’t want the coupon?
            </h2>

            {/* Yes Button */}
            <button
              onClick={onClose} // Close modal on "Yes"
              className="w-[20%] bg-red-600 text-white py-3 rounded-md mb-4 mx-auto"
            >
              Yes
            </button>

            {/* I WANT MY DISCOUNT Button */}
            <p
              onClick={handleBackToEmail}
              className="text-sm text-[#857373] cursor-pointer"
            >
              I WANT MY DISCOUNT!
            </p>
          </>
        )}

        {/* Image displayed when "NO, THANK YOU" is clicked */}
        {showConfirm && (
          <div className="absolute bottom-0 left-4 h-[70%] ">
            <img
              src="/sad.svg"
              alt="Sad face"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondModal;
