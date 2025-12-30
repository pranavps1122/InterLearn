import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Search,
  Eye,
  AlertCircle,
  Trash2,
  Edit2,
  Ban,
  Unlock,
} from "lucide-react";
import "./ReviewerManagement.css";

import ConfirmModal from "../../../../components/common/ConfirmModal";
import Table from "../../../../components/common/Admin/Table";
import ReviewerDetailsModal from "../ReviewersManagement/configs/reviewerModal";

import {
  ApprovedReviewers,
  DeleteReviewer,
  BlockReviewer,
  UnblockReviewer,
} from "../../../../services/admin.service";

import { ConfirmModalConfig, Action } from "./configs/ConfirmModal.config";

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

interface Reviewer {
  _id: string;
  name: string;
  full_name: string;
  role: string;
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

export default function ReviewerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [specializationFilter, setSpecializationFilter] =
    useState("All Specialization");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<Action | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState<Reviewer | null>(
    null
  );

  useEffect(() => {
    loadApprovedReviewers();
  }, []);

  const loadApprovedReviewers = async () => {
    try {
      const res = await ApprovedReviewers();
      console.log("res", res);
      setReviewers(res || []);
    } catch (error) {
      toast.error("Failed to load reviewers");
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
      if (modalAction === "delete") {
        await DeleteReviewer(selectedId);
        toast.success("Reviewer deleted!");
      }

      if (modalAction === "block") {
        await BlockReviewer(selectedId);
        toast.success("Reviewer blocked!");
      }
      if (modalAction === "unblock") {
        await UnblockReviewer(selectedId);
        toast.success("Reviewer unblocked");
      }

      await loadApprovedReviewers();
    } catch {
      toast.error("Operation failed");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
      setModalAction(null);
    }
  };

  const stats: Stat[] = [
    { label: "TOTAL INTERVIEWERS", value: reviewers.length.toString() },
    {
      label: "APPROVED",
      value: reviewers.length.toString(),
    },
    { label: "AVERAGE RATING", value: "4.7", icon: "★" },
    { label: "ACTIVE THIS MONTH", value: "128" },
  ];

  const filteredReviewers = useMemo(() => {
    return reviewers.filter((r) => {
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const combined = `${r.name ?? ""} ${r.email ?? ""}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }

      if (
        specializationFilter !== "All Specialization" &&
        r.field?.toLowerCase() !== specializationFilter.toLowerCase()
      )
        return false;

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
      key: "name",
      label: "INTERVIEWER",
      render: (r: Reviewer) => (
        <div className="interviewer-cell">
          <div className="interviewer-info">
            <p className="interviewer-name">{r.name}</p>
            <p className="interviewer-email">{r.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "field",
      label: "SPECIALIZATION",
      render: (r: Reviewer) => <p>{r.field || "N/A"}</p>,
    },
    {
      key: "rating",
      label: "RATING",
      render: (r: Reviewer) => <p>{r.rating ?? "N/A"}</p>,
    },
    {
      key: "interviews",
      label: "INTERVIEWS",
      render: (r: Reviewer) => <p>{r.interviews ?? "N/A"}</p>,
    },
    {
      key: "earnings",
      label: "EARNINGS",
      render: (r: Reviewer) => <p>{r.earnings ?? "1000"}</p>,
    },
    {
      key: "status",
      label: "STATUS",
      render: (r: Reviewer) => (
        <span
          className={`status-badge ${
            r.is_active ? "status-approved" : "status-rejected"
          }`}
        >
          {r.is_active ? "Active" : "Blocked"}
        </span>
      ),
    },
  ];

  const rowActions = (r: Reviewer) => (
    <div className="actions-cell">
      <button
        className="action-btn"
        title="View"
        onClick={() => openDetailsModal(r)}
      >
        <Eye size={16} />
      </button>

      <button className="action-btn" title="Edit">
        <Edit2 size={16} />
      </button>

      <button
        className="action-btn"
        title={r.is_active ? "Block Reviewer" : "Unblock Reviewer"}
        onClick={() => openConfirm(r._id, r.is_active ? "block" : "unblock")}
      >
        {r.is_active ? <Ban size={16} /> : <Unlock size={16} />}
      </button>

      <button
        className="action-btn"
        title="Delete"
        onClick={() => openConfirm(r._id, "delete")}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const modalConfig = modalAction ? ConfirmModalConfig[modalAction] : null;

  return (
    <>
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="page-title">Interviewer Management</h1>

            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search interviewers..."
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
                <p className="stat-value">
                  {stat.value} {stat.icon}
                </p>
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
            "No reviewers found"
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
    </>
  );
}
