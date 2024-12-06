import React, { useState, useEffect } from "react";

// CSS for the scaling effect
const styles = {
  scaleAnimation: `
    @keyframes scaleUpDown {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .scale-animation { animation: scaleUpDown 1s ease-in-out infinite; }
  `
};

interface SpinWheelProps {
  onClose: () => void;  // Added onClose prop to handle closing the modal from SpinWheel
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onClose }) => {
  const [spinning, setSpinning] = useState(false);
  const [deg, setDeg] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // Track popup visibility

  const rewards = [
    "10% off",
    "Free Trial",
    "20% off", // This is the winning reward
    "Free Gift",
    "50% off",
    "Nothing",
  ];

  const spin = () => {
    setSpinning(true);
    const winningIndex = rewards.indexOf("20% off");
    const segmentDegree = 140;

    const totalRotation = 360 * 5 + segmentDegree * winningIndex;
    setDeg(totalRotation);

    setTimeout(() => {
      setReward("20% off");
      setSpinning(false);
      setShowPopup(true);
    }, 3500);
  };

  const createWheelGradient = () => {
    const segments = rewards.map((reward, index) => {
      const color = index % 2 === 0 ? "#e93894" : "#542004";
      const degree = 360 / rewards.length;
      const startAngle = degree * index;
      return `${color} ${startAngle}deg ${startAngle + degree}deg`;
    }).join(", ");
    return `conic-gradient(${segments})`;
  };

  useEffect(() => {
    const scaleText = document.getElementById("congrats-text");
    if (scaleText) {
      scaleText.classList.add("scale-animation");
    }

    return () => {
      if (scaleText) {
        scaleText.classList.remove("scale-animation");
      }
    };
  }, [showPopup]);

  return (
    <div className="flex flex-col items-center">
      <style>{styles.scaleAnimation}</style>

      {/* Spin Wheel */}
      <div
        className="relative"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundImage: createWheelGradient(),
          transform: `rotate(${deg}deg)`,
          transition: spinning
            ? "transform 3.5s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Center Spinner Dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        {/* Display Reward Labels */}
        {rewards.map((reward, index) => {
          const segmentDegree = 360 / rewards.length;
          const offset = segmentDegree * index + segmentDegree / 1;
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-185%, -50%) rotate(${offset}deg)`,
                position: "absolute",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#fff",
                whiteSpace: "nowrap",
                transformOrigin: "180% 60%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {reward}
            </div>
          );
        })}
      </div>

      {/* Spin Button */}
      {!spinning && !reward && (
        <div className="mt-6">
          <button
            onClick={spin}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-200"
          >
            Spin the Wheel
          </button>
        </div>
      )}

      {/* Congratulations Popup */}
      {showPopup && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50"
          style={{ zIndex: 100 }}
        >
          <div
            className="bg-gradient-to-r from-purple-600 to-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
          >
            <h2
              id="congrats-text"
              className="text-2xl font-bold text-white"
            >
              Congratulations!
            </h2>
            <p className="mt-4 text-lg text-red-600">
              <strong>{`You won: ${reward}`}</strong>
            </p>
            <div className="mt-4">
              <button
                className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-200"
                onClick={() => {
                  setShowPopup(false);
                  onClose();  // Close the modal when prize is claimed
                }}
              >
                Claim Prize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reward Display */}
      {reward && !spinning && !showPopup && (
        <div className="mt-4 text-lg font-semibold text-green-500">
          {`You won: ${reward}`}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
