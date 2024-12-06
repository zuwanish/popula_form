"use client";

import { useEffect, useState } from "react";
import Modal from "./modal"; // Import the first Modal component
import SecondModal from "./SecondModal"; // Import the second Modal component

export default function ScreenshotPage() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("Taking you to website...");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSecondModal, setShowSecondModal] = useState<boolean>(false); // New state for the second modal
  const [showPopup, setShowPopup] = useState<boolean>(true); // New state for popup visibility
  const [blurred, setBlurred] = useState<boolean>(false); // State to control blur
  const [blurIntensity, setBlurIntensity] = useState<number>(10); // Increased initial intensity for more blur

  useEffect(() => {
    const messages = [
      "Taking you to website...",
      "Almost there...",
      "Hang tight!",
      "Just a moment...",
    ];
    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      setMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 3000); // Change message every 3 seconds

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const response = await fetch("/api/screenshot");
        const data = await response.json();

        if (data.file) {
          setScreenshot(data.file);
          setTimeout(() => {
            setShowModal(true);
            setBlurred(true); // Increase blur intensity when modal is shown
            setBlurIntensity(80); // Stronger blur intensity
          }, 1000); // Modal appears 2 seconds after screenshot is loaded
        }
      } catch (error) {
        console.error("Error fetching screenshot:", error);
        setTimeout(() => {
          setShowModal(true);
          setBlurred(true); // Apply blur
          setBlurIntensity(80); // Stronger blur intensity
        }, 15000); // Modal shows after 15 seconds if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshot();
  }, []);

  const closeModalAndPopup = () => {
    setShowModal(false); // Close the first modal
    setShowPopup(false); // Close the popup
    setBlurred(false); // Remove blur when modal is closed
    setBlurIntensity(10); // Reset blur intensity to normal
    setTimeout(() => {
      setShowSecondModal(true); // Open the second modal after a delay
    }, 500); // Delay opening the second modal by 500ms
  };

  const closeSecondModal = () => {
    setShowSecondModal(false); // Close the second modal
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background */}
      {screenshot && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
            blurred ? `backdrop-blur-[${blurIntensity}px]` : ""
          }`}
          style={{
            backgroundImage: `url('${screenshot}')`,
          }}
        ></div>
      )}

      {/* Loading Screen */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 bg-white">
          {/* Wave Animation */}
          <div className="wave-loader w-full h-2 mb-4">
            <div className="wave-loader-inner"></div>
          </div>

          {/* Rotating Message */}
          <p className="text-lg font-medium">{message}</p>
        </div>
      )}

      {/* Content */}
      {!loading && <div className="relative z-10 text-white text-center"></div>}

      {/* First Modal */}
      {showModal && <Modal onClose={closeModalAndPopup} />}

      {/* Second Modal */}
      {showSecondModal && <SecondModal onClose={closeSecondModal} />}

      {/* Add Custom CSS for Wave Animation */}
      <style jsx global>{`
        /* Wave loader animation */
        .wave-loader {
          position: relative;
          overflow: hidden;
        }

        .wave-loader-inner {
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            to right,
            #e0e0e0 10%,
            #f0f0f0 50%,
            #e0e0e0 90%
          );
          animation: wave 2s infinite ease-in-out;
        }

        @keyframes wave {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: -100%;
          }
        }
      `}</style>
    </div>
  );
}
