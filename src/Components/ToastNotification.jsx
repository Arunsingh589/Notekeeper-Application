// src/components/ToastNotification.jsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Export toast notification functions for success and error messages
const ToastNotification = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
};

export default ToastNotification;
