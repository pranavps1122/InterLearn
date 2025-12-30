export type Action =
  | "delete"
  | "accept"
  | "reject"
  | "block"
  | "unblock";

export const ConfirmModalConfig = {
  delete: {
    title: `Delete Reviewer`,
    message: "This reviewer will be permanently removed.",
    confirmText: "Delete",
    variant: "danger",
  },
  accept: {
    title: "Accept Reviewer?",
    message: "Do you want to accept this reviewer?",
    confirmText: "Accept",
    variant: "info",
  },
  reject: {
    title: "Reject Reviewer?",
    message: "Are you sure you want to reject this reviewer?",
    confirmText: "Reject",
    variant: "warning",
  },
  block: {
    title: "Block Reviewer?",
    message: "Do you want to block this reviewer?",
    confirmText: "Block",
    variant: "warning",
  },
  unblock: {
    title: "Unblock Reviewer?",
    message: "Are you sure you want to unblock this reviewer?",
    confirmText: "Unblock",
    variant: "info",
  },
 
} as const;
