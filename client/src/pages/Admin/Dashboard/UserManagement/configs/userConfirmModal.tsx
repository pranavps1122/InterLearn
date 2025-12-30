export type StudentAction =
  | "delete"
  | "block"
  | "unblock";




export const studentConfirmModalConfig = {
  delete: {
    title: "Delete Student?",
    message: "This student account will be permanently removed.",
    confirmText: "Delete",
    variant: "danger",
  },
  block: {
    title: "Block Student?",
    message: "This student will be blocked and cannot access the platform.",
    confirmText: "Block",
    variant: "warning",
  },
  unblock: {
    title: "Unblock Student?",
    message: "Are you sure you want to unblock this student?",
    confirmText: "Unblock",
    variant: "info",
  },
} as const;
