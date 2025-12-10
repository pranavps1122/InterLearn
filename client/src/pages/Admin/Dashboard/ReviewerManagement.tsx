import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Search,
  Eye,
  AlertCircle,
  Check,
  Trash2,
  Edit2,
  XCircle,
} from "lucide-react";
import "./ReviewerManagement.css";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Table from "../../../components/common/Table";
import {
  GetAllReviewers,
  DeleteReviewer,
  ApproveReviewer,
  RejectReviewer,
} from "../../../services/admin.service";

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export default function InterviewerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [specializationFilter, setSpecializationFilter] =
    useState("All Specialization");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  const [reviewers, setAllReviewers] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [modalAction, setModalAction] = useState<
    "delete" | "accept" | "reject" | null
  >(null);

  useEffect(() => {
    loadReviewers();
  }, []);

  const loadReviewers = async () => {
    try {
      const res = await GetAllReviewers();
      setAllReviewers(res.data || []);
    } catch (error) {
      console.log("error while fetching reviewers", error);
      toast.error("Failed to load reviewers");
    }
  };

  const openConfirm = (
    id: string,
    action: "delete" | "accept" | "reject"
  ) => {
    setSelectedId(id);
    setModalAction(action);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!selectedId || !modalAction) return;

    try {
      if (modalAction === "delete") {
        const res = await DeleteReviewer(selectedId);
        toast.success(res?.data?.message || "Deleted successfully!");
      }

      if (modalAction === "accept") {
        await ApproveReviewer(selectedId);
        toast.success("Reviewer approved!");
      }

      if (modalAction === "reject") {
        await RejectReviewer(selectedId);
        toast.success("Reviewer rejected!");
      }

      await loadReviewers();
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
    { label: "TOTAL INTERVIEWERS", value: reviewers.length.toString() },
    {
      label: "APPROVED",
      value: reviewers
        .filter((r) => r.application_status === "approved")
        .length.toString(),
    },
    {
      label: "PENDING APPROVAL",
      value: reviewers
        .filter((r) => r.application_status === "pending")
        .length.toString(),
    },
    { label: "AVERAGE RATING", value: "4.7", icon: "★" },
    { label: "ACTIVE THIS MONTH", value: "128" },
  ];

 
  const filteredReviewers = useMemo(() => {
    return reviewers.filter((r) => {
    
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const combined = `${r.full_name ?? ""} ${r.email ?? ""}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }

      if (statusFilter && statusFilter !== "All Status") {
        const normalized = statusFilter.toLowerCase();
     
        const mapStatus =
          normalized === "approved"
            ? "approved"
            : normalized === "pending"
            ? "pending"
            : normalized === "rejected"
            ? "rejected"
            : normalized;
        if ((r.application_status ?? "").toLowerCase() !== mapStatus) return false;
      }

     
      if (
        specializationFilter &&
        specializationFilter !== "All Specialization" &&
        r.field
      ) {
        if (
          r.field.toString().toLowerCase() !==
          specializationFilter.toLowerCase()
        )
          return false;
      } else if (
        specializationFilter &&
        specializationFilter !== "All Specialization" &&
        !r.field
      ) {
        return false;
      }

      if (ratingFilter && ratingFilter !== "All Ratings") {
        const val = Number(r.rating ?? 0);
        if (ratingFilter === "4.9+" && val < 4.9) return false;
        if (ratingFilter === "4.5+" && val < 4.5) return false;
        if (ratingFilter === "4.0+" && val < 4.0) return false;
      }

      return true;
    });
  }, [reviewers, searchTerm, statusFilter, specializationFilter, ratingFilter]);


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
    { key: "rating", label: "RATING", render: (r: any) => <p>{r.rating ?? "N/A"}</p> },
    {
      key: "interviews",
      label: "INTERVIEWS",
      render: (r: any) => <p>{r.interviews ?? "N/A"}</p>,
    },
    {
      key: "earnings",
      label: "EARNINGS",
      render: (r: any) => <p>{r.earnings ?? "1000"}</p>,
    },
    {
      key: "application_status",
      label: "STATUS",
      render: (r: any) => {
        const status = r.application_status ?? "unknown";
        const cls =
          status === "approved"
            ? "status-approved"
            : status === "pending"
            ? "status-pending"
            : "status-rejected";
        return <span className={`status-badge ${cls}`}>{status}</span>;
      },
    },
  ];


  const rowActions = (r: any) => (
    <div className="actions-cell">
      {r.application_status === "approved" ? (
        <>
          <button className="action-btn" title="View">
            <Eye size={16} />
          </button>
          <button className="action-btn" title="Edit">
            <Edit2 size={16} />
          </button>
          <button className="action-btn" title="Warn">
            <AlertCircle size={16} />
          </button>

          <button
            className="action-btn"
            title="Delete"
            onClick={() => openConfirm(r._id, "delete")}
          >
            <Trash2 size={16} />
          </button>
        </>
      ) : (
        <>
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
            onClick={() => openConfirm(r._id, "reject")}
          >
            <XCircle size={16} />
          </button>
        </>
      )}
    </div>
  );

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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>

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

            <select className="filter-select">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

         
          <div className="table-container">
            <Table columns={columns} data={filteredReviewers} actions={rowActions} />
          </div>
        </div>
      </main>

   
      <ConfirmModal
        isOpen={showConfirm}
        title={
          modalAction === "delete"
            ? "Delete Reviewer?"
            : modalAction === "accept"
            ? "Accept Reviewer?"
            : "Reject Reviewer?"
        }
        message={
          modalAction === "delete"
            ? "This reviewer will be permanently removed."
            : modalAction === "accept"
            ? "Do you want to accept this reviewer?"
            : "Are you sure you want to reject this reviewer?"
        }
        confirmText={
          modalAction === "delete"
            ? "Delete"
            : modalAction === "accept"
            ? "Accept"
            : "Reject"
        }
        cancelText="Cancel"
        variant={
          modalAction === "delete"
            ? "danger"
            : modalAction === "accept"
            ? "info"
            : "warning"
        }
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedId(null);
          setModalAction(null);
        }}
      />
    </>
  );
}
