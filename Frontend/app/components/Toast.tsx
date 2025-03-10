import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background-color:rgb(242, 255, 242);
          border: 1px solid rgb(28, 175, 28);
          color: rgb(28, 175, 28);
          font-weight: 600;
          padding: 16px 24px;
          border-radius: 8px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}