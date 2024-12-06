import React from "react";
import SpinWheel from "./SpinWheel"; // Import the SpinWheel component

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        

        {/* Spin Wheel */}
        <SpinWheel onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
