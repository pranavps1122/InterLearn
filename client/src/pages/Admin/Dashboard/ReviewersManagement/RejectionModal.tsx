import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import "./RejectionModal.css";

interface RejectionModalProps {
  isOpen: boolean;
  reviewerName?: string;
  onConfirm: (note: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RejectionModal({
  isOpen,
  reviewerName = "Reviewer",
  onConfirm,
  onCancel,
  isLoading = false,
}: RejectionModalProps) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!note.trim()) {
      setError("Please provide a rejection reason");
      return;
    }

    onConfirm(note);
    setNote("");
    setError("");
  };

  const handleCancel = () => {
    setNote("");
    setError("");
    onCancel();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="rejection-modal-overlay" onClick={handleCancel}>
      <div
        className="rejection-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rejection-modal-header">
          <div className="rejection-modal-title-section">
            <div className="rejection-modal-icon">
              <AlertCircle size={24} />
            </div>
            <div>
              <h2>Reject Reviewer</h2>
              <p className="rejection-modal-subtitle">
                Please provide a reason for rejecting {reviewerName}
              </p>
            </div>
          </div>
          <button className="rejection-modal-close-btn" onClick={handleCancel}>
            <X size={24} />
          </button>
        </div>

        <div className="rejection-modal-body">
          <div className="rejection-form-group">
            <label htmlFor="rejection-note" className="rejection-label">
              Rejection Reason *
            </label>
            <textarea
              id="rejection-note"
              className={`rejection-textarea ${error ? "rejection-error" : ""}`}
              placeholder="Write a detailed reason for rejecting this reviewer..."
              value={note}
              onChange={handleTextareaChange}
              disabled={isLoading}
              rows={6}
            />
            <div className="rejection-textarea-footer">
              <span className="rejection-char-count">
                {note.length} / 500 characters
              </span>
              {error && <span className="rejection-error-text">{error}</span>}
            </div>
          </div>

          <div className="rejection-info-box">
            <p>
              💡 <strong>Tip:</strong> Be specific about the reasons for
              rejection. This helps reviewers understand areas for improvement.
            </p>
          </div>
        </div>

        <div className="rejection-modal-footer">
          <button
            className="rejection-btn-cancel"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="rejection-btn-confirm"
            onClick={handleConfirm}
            disabled={isLoading || !note.trim()}
          >
            {isLoading ? "Processing..." : "Reject Reviewer"}
          </button>
        </div>
      </div>
    </div>
  );
}
