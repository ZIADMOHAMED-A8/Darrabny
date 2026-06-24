import toast from "react-hot-toast";

export function showSuccessToast(message: string) {
  toast.success(message, {
    duration: 5000,
    style: {
      minWidth: "380px",
      padding: "16px 18px",
      borderRadius: "16px",
      background: "#F8FBFF",
      color: "#0F172A",
      border: "1px solid #BFDBFE",
      boxShadow: "0 12px 30px rgba(26, 111, 168, 0.12)",
      fontSize: "14px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#1A6FA8",
      secondary: "#FFFFFF",
    },
  });
}
