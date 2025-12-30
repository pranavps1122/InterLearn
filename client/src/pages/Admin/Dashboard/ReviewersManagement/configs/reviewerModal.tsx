import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Fullscreen } from "lucide-react";
import "./reviewerModal.css";

interface Reviewer {
  _id: string;
  name: string;
  full_name:string
  email: string;
  phone?: string;
  field?: string;
  rating?: number;
  interviews?: number;
  earnings?: number;
  is_active?: boolean;
  motivation?: string;
  createdAt?: string;
  totalHours?: number;
  completionRate?: number;
  documents?: string[];
  images?: string[];
  bio?: string;
  profile_image_url?: string;
  current_role?: string;
  company_name?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_file?: string;
  education_certificate_file?: string;
  experience_certificate_file?: string;
  education?: string;
  experience_years?: number;
  domains?: string[];
  skills?: any[];
  additional_info?: string;
  application_status?: string;
}

interface ReviewerDetailsModalProps {
  isOpen: boolean;
  reviewer: Reviewer | null;
  onClose: () => void;
}

export default function ReviewerDetailsModal({
  isOpen,
  reviewer,
  onClose,
}: ReviewerDetailsModalProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageType, setImageType] = useState<"document" | "images">("document");

  if (!isOpen || !reviewer) return null;

  // Collect certificate images
  const certificateImages = [
    reviewer.education_certificate_file,
    reviewer.experience_certificate_file,
  ].filter(Boolean);

  const documentImages = [reviewer.resume_file, ...certificateImages].filter(
    Boolean
  );

  const allImages =
    imageType === "document"
      ? documentImages
      : reviewer.images || [];

  const openImageModal = (index: number, type: "document" | "images") => {
    setSelectedImageIndex(index);
    setImageType(type);
    setImageModalOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const switchImageType = (type: "document" | "images") => {
    setImageType(type);
    setSelectedImageIndex(0);
  };

  const getImageLabel = (index: number) => {
    if (imageType === "document") {
      if (index === 0) return "Resume";
      if (index === 1) return "Education Certificate";
      if (index === 2) return "Experience Certificate";
    }
    return `Image ${index + 1}`;
  };

  const isPDF = (url: string) => {
    return url?.toLowerCase().includes(".pdf") || 
           url?.includes("raw/upload") || 
           !url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  };

  return (
    <>
      <div className="reviewer-modal-overlay" onClick={onClose}>
        <div className="reviewer-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="reviewer-modal-header">
            <h2>Reviewer Details</h2>
            <button className="reviewer-modal-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="reviewer-modal-body">
            {/* Basic Info Section */}
            <div className="reviewer-details-section">
              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item">
                  <label>Name</label>
                  <p>{reviewer.name||reviewer.full_name}</p>
                </div>
                <div className="reviewer-detail-item">
                  <label>Email</label>
                  <p>{reviewer.email}</p>
                </div>
              </div>

              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item">
                  <label>Phone</label>
                  <p>{reviewer.phone || "N/A"}</p>
                </div>
                <div className="reviewer-detail-item">
                  <label>Specialization</label>
                  <p>{reviewer.field || "N/A"}</p>
                </div>
              </div>

              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item">
                  <label>Current Role</label>
                  <p>{reviewer.current_role || "N/A"}</p>
                </div>
                <div className="reviewer-detail-item">
                  <label>Company</label>
                  <p>{reviewer.company_name || "N/A"}</p>
                </div>
              </div>

              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item">
                  <label>Education</label>
                  <p>{reviewer.education || "N/A"}</p>
                </div>
                <div className="reviewer-detail-item">
                  <label>Experience Years</label>
                  <p>{reviewer.experience_years || "0"} years</p>
                </div>
              </div>

              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item reviewer-full-width">
                  <label>Bio</label>
                  <p>{reviewer.bio || reviewer.motivation || "No bio provided"}</p>
                </div>
              </div>

              <div className="reviewer-detail-row">
                <div className="reviewer-detail-item reviewer-full-width">
                  <label>Additional Info</label>
                  <p>{reviewer.additional_info || "None"}</p>
                </div>
              </div>

              {/* Domains */}
              {reviewer.domains && reviewer.domains.length > 0 && (
                <div className="reviewer-detail-row">
                  <div className="reviewer-detail-item reviewer-full-width">
                    <label>Domains</label>
                    <div className="reviewer-tags-container">
                      {reviewer.domains.map((domain, idx) => (
                        <span key={idx} className="reviewer-tag">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Links Section */}
              {(reviewer.linkedin_url || reviewer.portfolio_url) && (
                <div className="reviewer-detail-row">
                  <div className="reviewer-detail-item reviewer-full-width">
                    <label>Links</label>
                    <div className="reviewer-links-container">
                      {reviewer.linkedin_url && (
                        <a
                          href={reviewer.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reviewer-link-btn"
                        >
                          LinkedIn
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {reviewer.portfolio_url && (
                        <a
                          href={reviewer.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="reviewer-link-btn"
                        >
                          Portfolio
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Section */}
            {(reviewer.rating ||
              reviewer.interviews ||
              reviewer.totalHours ||
              reviewer.completionRate ||
              reviewer.earnings) && (
              <div className="reviewer-stats-section">
                <h3>Statistics</h3>
                <div className="reviewer-stats-grid-modal">
                  {reviewer.rating && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Rating</span>
                      <span className="reviewer-stat-value">{reviewer.rating} ⭐</span>
                    </div>
                  )}
                  {reviewer.interviews && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Interviews</span>
                      <span className="reviewer-stat-value">{reviewer.interviews}</span>
                    </div>
                  )}
                  {reviewer.totalHours && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Total Hours</span>
                      <span className="reviewer-stat-value">{reviewer.totalHours}</span>
                    </div>
                  )}
                  {reviewer.completionRate && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Completion Rate</span>
                      <span className="reviewer-stat-value">
                        {reviewer.completionRate}%
                      </span>
                    </div>
                  )}
                  {reviewer.earnings && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Earnings</span>
                      <span className="reviewer-stat-value">${reviewer.earnings}</span>
                    </div>
                  )}
                  {reviewer.createdAt && (
                    <div className="reviewer-stat-item">
                      <span className="reviewer-stat-label">Join Date</span>
                      <span className="reviewer-stat-value">
                        {new Date(reviewer.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Status Section */}
            <div className="reviewer-status-section">
              <h3>Status</h3>
              <div className="reviewer-status-container">
                <span
                  className={`reviewer-status-badge ${
                    reviewer.is_active ? "reviewer-status-approved" : "reviewer-status-rejected"
                  }`}
                >
                  {reviewer.is_active ? "Active" : "Blocked"}
                </span>
                {reviewer.application_status && (
                  <span className={`reviewer-status-badge reviewer-status-${reviewer.application_status}`}>
                    {reviewer.application_status.charAt(0).toUpperCase() +
                      reviewer.application_status.slice(1)}
                  </span>
                )}
              </div>
            </div>

            {/* Documents & Images Section */}
            {(documentImages.length > 0 || 
              (reviewer.images && reviewer.images.length > 0)) && (
              <div className="reviewer-images-section">
                <h3>Documents & Files</h3>

                {/* Documents Container */}
                {documentImages.length > 0 && (
                  <div className="reviewer-image-container-wrapper">
                    <div className="reviewer-image-container-header">
                      <h4>Documents</h4>
                      <span className="reviewer-image-count">
                        {documentImages.length} file(s)
                      </span>
                    </div>
                    <div className="reviewer-images-grid">
                      {documentImages.map((doc, index) => (
                        <div
                          key={index}
                          className="reviewer-image-thumbnail"
                          onClick={() => openImageModal(index, "document")}
                          title={getImageLabel(index)}
                        >
                          <img src={doc} alt={getImageLabel(index)} />
                          <div className="reviewer-image-overlay">
                            <div className="reviewer-overlay-content">
                              <span>{getImageLabel(index)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Images Container */}
                {reviewer.images && reviewer.images.length > 0 && (
                  <div className="reviewer-image-container-wrapper">
                    <div className="reviewer-image-container-header">
                      <h4>Additional Images</h4>
                      <span className="reviewer-image-count">
                        {reviewer.images.length} file(s)
                      </span>
                    </div>
                    <div className="reviewer-images-grid">
                      {reviewer.images.map((img, index) => (
                        <div
                          key={index}
                          className="reviewer-image-thumbnail"
                          onClick={() => openImageModal(index, "images")}
                        >
                          <img src={img} alt={`Image ${index + 1}`} />
                          <div className="reviewer-image-overlay">
                            <div className="reviewer-overlay-content">
                              <span>View</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="reviewer-modal-footer">
            <button className="reviewer-btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {imageModalOpen && (
        <div
          className="reviewer-image-modal-overlay"
          onClick={() => setImageModalOpen(false)}
        >
          <div
            className="reviewer-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reviewer-image-modal-header">
              <div className="reviewer-image-modal-title">
                <h3>
                  {imageType === "document" ? "Document" : "Image"} -
                  {getImageLabel(selectedImageIndex)}
                </h3>
                <span className="reviewer-image-counter">
                  {selectedImageIndex + 1} / {allImages.length}
                </span>
              </div>
              <button
                className="reviewer-image-modal-close"
                onClick={() => setImageModalOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <div className="reviewer-image-modal-body">
              <button
                className="reviewer-nav-btn reviewer-prev-btn"
                onClick={handlePrevImage}
                disabled={allImages.length <= 1}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="reviewer-image-display">
                {isPDF(allImages[selectedImageIndex]) ? (
                  <embed
                    src={allImages[selectedImageIndex]}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <img
                    src={allImages[selectedImageIndex]}
                    alt={getImageLabel(selectedImageIndex)}
                  />
                )}
              </div>

              <button
                className="reviewer-nav-btn reviewer-next-btn"
                onClick={handleNextImage}
                disabled={allImages.length <= 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="reviewer-image-modal-footer">
              {documentImages.length > 0 && (
                <button
                  className={`reviewer-type-btn ${
                    imageType === "document" ? "active" : ""
                  }`}
                  onClick={() => switchImageType("document")}
                >
                  Documents ({documentImages.length})
                </button>
              )}
              {reviewer.images && reviewer.images.length > 0 && (
                <button
                  className={`reviewer-type-btn ${
                    imageType === "images" ? "active" : ""
                  }`}
                  onClick={() => switchImageType("images")}
                >
                  Images ({reviewer.images.length})
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}