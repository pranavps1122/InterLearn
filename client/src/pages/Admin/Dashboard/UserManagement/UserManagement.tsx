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
  Ban,
  Unlock,
} from "lucide-react";
import "./UserManagement.css";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import Table from "../../../../components/common/Admin/Table";
import {
  GetAllUsers,
  GetSpecificUser,
  DeleteUser,
  BlockUser,
  UnblockUser,
} from "../../../../services/admin.service";

import { studentConfirmModalConfig } from "./configs/userConfirmModal";

import UserDetailsModal from "./configs/studentModal";

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

interface User {
  _id: string;
  name: string;
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

export default function InterviewerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [specializationFilter, setSpecializationFilter] =
    useState("All Specialization");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [users, setAllUsers] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User | null>(null);
  const [modalAction, setModalAction] = useState<
    "delete" | "edit" | "block" | "unblock" | null
  >(null);

  useEffect(() => {
    LoadUsers();
  }, []);

  const LoadUsers = async () => {
    try {
      const res = await GetAllUsers();
      console.log("result", res);
      setAllUsers(res || []);
    } catch (error) {
      console.log("error while fetching reviewers", error);
      toast.error("Failed to load reviewers");
    }
  };

  const openConfirm = (
    id: string,
    action: "delete" | "edit" | "block" | "unblock"
  ) => {
    setSelectedId(id);
    setModalAction(action);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!selectedId || !modalAction) return;

    try {
      if (modalAction === "delete") {
        const res = await DeleteUser(selectedId);
        toast.success(res?.data?.message || "Deleted successfully!");
      }
      if (modalAction === "block") {
        const res = await BlockUser(selectedId);
        toast.success(res?.data?.message || "Blocked successfully!");
      }
      if (modalAction === "unblock") {
        const res = await UnblockUser(selectedId);
        toast.success(res?.data?.message || "Unblocked successfully!");
      }

      await LoadUsers();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
      setModalAction(null);
    }
  };

  const openDetailsModal = (user: User) => {
    setSelectedUsers(user);
    setDetailsModalOpen(true);
    console.log(user);
  };

  const stats: Stat[] = [
    { label: "TOTAL USERS", value: users.length.toString() },
    {
      label: "ACTIVE USERS",
      value: users.filter((val) => val.is_active == true).length.toString(),
    },
    {
      label: "INACTIVE USERS",
      value: users.filter((val) => val.is_active == false).length.toString(),
    },
    { label: "ACTIVE THIS MONTH", value: "128" },
  ];

  const filteredReviewers = useMemo(() => {
    return users.filter((r) => {
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
        if ((r.application_status ?? "").toLowerCase() !== mapStatus)
          return false;
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
  }, [users, searchTerm, statusFilter, specializationFilter, ratingFilter]);

  const columns = [
    {
      key: "full_name",
      label: "Learners",
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
      label: "ROle",
      render: (r: any) => <p>{r.role || "N/A"}</p>,
    },
    {
      key: "rating",
      label: "Join date",
      render: (r: any) => (
        <p>
          {" "}
          {new Date(r.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      ),
    },
    {
      key: "Bookings",
      label: "Bookings",
      render: (r: any) => <p>{r.interviews ?? "N/A"}</p>,
    },
    {
      key: "Streak Count",
      label: "Streak Count",
      render: (r: any) => <p>{r.earnings ?? "N/A"}</p>,
    },
    {
      key: "application_status",
      label: "STATUS",
      render: (r: any) => {
        return (
          <span
            className={`status-badge ${
              r.is_active ? "status-approved" : "status-rejected"
            }`}
          >
            {r.is_active ? "Active" : "Blocked"}
          </span>
        );
      },
    },
  ];

  const rowActions = (s: any) => (
    <div className="actions-cell">
      <button
        className="action-btn"
        title="View"
        onClick={() => openDetailsModal(s)}
      >
        <Eye size={16} />
      </button>

      <button
        className="action-btn"
        title={s.is_active ? "Block Student" : "Unblock Student"}
        onClick={() => openConfirm(s._id, s.is_active ? "block" : "unblock")}
      >
        {s.is_active ? <Ban size={16} /> : <Unlock size={16} />}
      </button>

      <button
        className="action-btn"
        title="Delete Student"
        onClick={() => openConfirm(s._id, "delete")}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const modalConfig = modalAction
    ? studentConfirmModalConfig[modalAction]
    : null;

  return (
    <>
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="page-title">Student Management</h1>

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

          {filteredReviewers.length > 0 ? (
            <div className="table-container">
              <Table
                columns={columns}
                data={filteredReviewers}
                actions={rowActions}
              />
            </div>
          ) : (
            "No reviewers data "
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

      <UserDetailsModal
        isOpen={detailsModalOpen}
        student={selectedUsers}
        onClose={() => setDetailsModalOpen(false)}
      />
    </>
  );
}
