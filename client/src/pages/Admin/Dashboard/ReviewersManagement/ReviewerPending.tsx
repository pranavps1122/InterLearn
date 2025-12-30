import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Search, Check, XCircle,Eye,Trash } from "lucide-react";
import "./ReviewerManagement.css";

import ConfirmModal from "../../../../components/common/ConfirmModal";
import Table from "../../../../components/common/Admin/Table";

import {
  PendingReviewers,
  ApproveReviewer,
  RejectReviewer,
} from "../../../../services/admin.service";

import {
  ConfirmModalConfig,
  Action,
} from "./configs/ConfirmModal.config";
import ReviewerDetailsModal from "../ReviewersManagement/configs/reviewerModal";
import RejectionModal from '../ReviewersManagement/RejectionModal'

interface Stat {
  label: string;
  value: string;
  icon?: string;
}
interface Reviewer {
  _id: string;
  name: string;
  full_name:string;
  email: string;
  phone?: string;
  field?: string;
  rating?: number;
  interviews?: number;
  earnings?: number;
  is_active?: boolean;
  bio?: string;
  joinDate?: string;
  totalHours?: number;
  completionRate?: number;
}
export default function PendingReviewerApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [specializationFilter, setSpecializationFilter] =
    useState("All Specialization");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  const [reviewers, setReviewers] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<Action | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
   const [selectedReviewer, setSelectedReviewer] = useState<Reviewer | null>(null);
   const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedReviewerForRejection, setSelectedReviewerForRejection] = useState<any>(null);
  const [rejectionLoading, setRejectionLoading] = useState(false);


  useEffect(() => {
    loadPendingReviewers();
  }, []);

  const loadPendingReviewers = async () => {
    try {
      const res = await PendingReviewers();
      console.log('res',res)
      setReviewers(res || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load pending reviewers");
    }
  };

    const handleRejectionConfirm = async (rejectionNote: string) => {
      if (!selectedReviewerForRejection) return;

      setRejectionLoading(true);
      try {
        await RejectReviewer(
          selectedReviewerForRejection._id,
          rejectionNote
        );

        toast.success("Reviewer rejected successfully!");

        setRejectionModalOpen(false);
        setSelectedReviewerForRejection(null);

        await loadPendingReviewers();
      } catch (error) {
       let message = error.response.data.details.body[0]
        toast.error(message);
      } finally {
        setRejectionLoading(false);
      }
    };


  const openConfirm = (id: string, action: Action) => {
    setSelectedId(id);
    setModalAction(action);
    setShowConfirm(true);
  };

    const openDetailsModal = (reviewer: Reviewer) => {
    setSelectedReviewer(reviewer);
    setDetailsModalOpen(true);
  };

const handleConfirm = async () => {
  if (!selectedId || !modalAction) return;

  try {
    if (modalAction === "accept") {
      await ApproveReviewer(selectedId);
      toast.success("Reviewer approved!");
      await loadPendingReviewers();
    }
  } catch (err) {
    console.error(err);
    toast.error("Operation failed");
  } finally {
    setShowConfirm(false);
    setSelectedId(null);
    setModalAction(null);
  }
};

  const stats: Stat[] = [
    { label: "TOTAL PENDING", value: reviewers.length.toString() },
  ];

  const filteredReviewers = useMemo(() => {
    return reviewers.filter((r) => {
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const combined = `${r.full_name ?? ""} ${r.email ?? ""}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }

      if (specializationFilter !== "All Specialization" && r.field) {
        if (
          r.field.toLowerCase() !== specializationFilter.toLowerCase()
        )
          return false;
      }

      if (ratingFilter !== "All Ratings") {
        const val = Number(r.rating ?? 0);
        if (ratingFilter === "4.9+" && val < 4.9) return false;
        if (ratingFilter === "4.5+" && val < 4.5) return false;
        if (ratingFilter === "4.0+" && val < 4.0) return false;
      }

      return true;
    });
  }, [reviewers, searchTerm, specializationFilter, ratingFilter]);

  const columns = [
    {
      key: "full_name",
      label: "INTERVIEWER",
      render: (r: any) => (
        <div className="interviewer-cell">
          <div className="interviewer-info">
            <p className="interviewer-name">{r.full_name}</p>
            <p className="interviewer-email">{r.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "field",
      label: "SPECIALIZATION",
      render: (r: any) => <p>{r.field || "N/A"}</p>,
    },
    {
      key: "experience_years",
      label: "EXPERIENCE",
      render: (r: any) => <p>{r.experience_years ?? "N/A"} yrs</p>,
    },
    {
      key: "application_status",
      label: "STATUS",
      render: (r:any) => (
         <span className={`status-badge ${r.application_status=='pending' ? "status-approved" : "status-rejected"}`}>
          {r.application_status=='pending' ? "Pending" : "Rejected"}
        </span>
      ),
    },
  ];

 const rowActions = (r: any) => (
  <div className="actions-cell">
    {r.application_status === "pending" ? (
      <>
        <button
          className="action-btn"
          title="View"
          onClick={() => openDetailsModal(r)}
        >
          <Eye size={16} />
        </button>

        <button
          className="action-btn"
          title="Accept"
          onClick={() => openConfirm(r._id, "accept")}
        >
          <Check size={16} />
        </button>

        <button
          className="action-btn"
          title="Reject"
          onClick={() => {
            setSelectedReviewerForRejection(r);
            setRejectionModalOpen(true);
          }}
        >
          <XCircle size={16} />
        </button>
      </>
    ):
    <>
     <button
          className="action-btn"
          title="View"
          onClick={() => openDetailsModal(r)}
        >
          <Eye size={16} />
        </button>

        </>
    }
  </div>
);

  const modalConfig = modalAction
    ? ConfirmModalConfig[modalAction]
    : null;

  return (
    <>
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="page-title">Pending Reviewer Applications</h1>

            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="filters-container">
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="filter-select"
            >
              <option>All Specialization</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Full Stack</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="filter-select"
            >
              <option>All Ratings</option>
              <option>4.9+</option>
              <option>4.5+</option>
              <option>4.0+</option>
            </select>
          </div>

          {filteredReviewers.length > 0 ? (
            <div className="table-container">
              <Table
                columns={columns}
                data={filteredReviewers}
                actions={rowActions}
              />
            </div>
          ) : (
            "No pending reviewer applications"
          )}
        </div>
      </main>

      <ConfirmModal
        isOpen={showConfirm}
        title={modalConfig?.title}
        message={modalConfig?.message}
        confirmText={modalConfig?.confirmText}
        variant={modalConfig?.variant}
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedId(null);
          setModalAction(null);
        }}
      />
        <ReviewerDetailsModal
              isOpen={detailsModalOpen}
              reviewer={selectedReviewer}
              onClose={() => setDetailsModalOpen(false)}
            />
            <RejectionModal
        isOpen={rejectionModalOpen}
        reviewerName={selectedReviewerForRejection?.name}
        onConfirm={handleRejectionConfirm}
        onCancel={() => {
          setRejectionModalOpen(false);
          setSelectedReviewerForRejection(null);
        }}
        isLoading={rejectionLoading}
      />
    </>
  );
}
