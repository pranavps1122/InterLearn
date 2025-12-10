import { AlertCircle, X } from "lucide-react";
import { useEffect } from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onCancel} />
      <div className="modal-container">
        <div className={`modal-box ${variant}`}>
          <div className="modal-header">
            <div className="modal-icon">
              <AlertCircle size={24} />
            </div>

            <button className="modal-close" onClick={onCancel}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-content">
            <h3 className="modal-title">{title}</h3>
            <p className="modal-message">{message}</p>
          </div>

          <div className="modal-footer">
            <button className="modal-btn cancel-btn" onClick={onCancel} disabled={isLoading}>
              {cancelText}
            </button>

            <button
              className={`modal-btn confirm-btn ${variant}`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
