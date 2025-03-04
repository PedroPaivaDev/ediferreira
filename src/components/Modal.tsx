import React, { useEffect } from 'react';

interface PropsModal {
  children: React.ReactNode;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setOpenModal }: PropsModal) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setOpenModal]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-mood-light p-6 rounded-lg shadow-lg w-96 relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenModal(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;