import React from "react";
import { X } from "lucide-react";
import "../../ReviewersManagement/configs/reviewerModal.css"

interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profile_image_url?: string;
  is_active?: boolean;
  streak_count?: number;
  longest_streak?: number;
  createdAt?: string;
}

interface Props {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
}

export default function StudentDetailsModal({
  isOpen,
  student,
  onClose,
}: Props) {
  if (!isOpen || !student) return null;

  return (
    <div className="reviewer-modal-overlay" onClick={onClose}>
      <div
        className="reviewer-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="reviewer-modal-header">
          <h2>Student Details</h2>
          <button className="reviewer-modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="reviewer-modal-body">
          {/* Profile */}
          <div className="reviewer-details-section">
            <div className="reviewer-detail-row">
              <div className="reviewer-detail-item">
                <label>Name</label>
                <p>{student.name}</p>
              </div>

              <div className="reviewer-detail-item">
                <label>Email</label>
                <p>{student.email}</p>
              </div>
            </div>

            <div className="reviewer-detail-row">
              <div className="reviewer-detail-item">
                <label>Phone</label>
                <p>{student.phone || "N/A"}</p>
              </div>

              <div className="reviewer-detail-item">
                <label>Role</label>
                <p>Student</p>
              </div>
            </div>

            <div className="reviewer-detail-row">
              <div className="reviewer-detail-item reviewer-full-width">
                <label>Bio</label>
                <p>{student.bio || "No bio provided"}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="reviewer-stats-section">
            <h3>Student Stats</h3>
            <div className="reviewer-stats-grid-modal">
              <div className="reviewer-stat-item">
                <span className="reviewer-stat-label">Streak Count</span>
                <span className="reviewer-stat-value">
                  {student.streak_count ?? 0}
                </span>
              </div>

              <div className="reviewer-stat-item">
                <span className="reviewer-stat-label">Longest Streak</span>
                <span className="reviewer-stat-value">
                  {student.longest_streak ?? 0}
                </span>
              </div>

              {student.createdAt && (
                <div className="reviewer-stat-item">
                  <span className="reviewer-stat-label">Joined</span>
                  <span className="reviewer-stat-value">
                    {new Date(student.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="reviewer-status-section">
            <h3>Status</h3>
            <div className="reviewer-status-container">
              <span
                className={`reviewer-status-badge ${
                  student.is_active
                    ? "reviewer-status-approved"
                    : "reviewer-status-rejected"
                }`}
              >
                {student.is_active ? "Active" : "Blocked"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="reviewer-modal-footer">
          <button className="reviewer-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
