import { useEffect } from "react";
import styles from "@/assets/css/statusToast.module.css";

export default function StatusToast({ status, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!status) return null;

  const getColor = () => {
    if (status >= 200 && status < 300) return "success";
    if (status >= 400 && status < 500) return "warning";
    if (status >= 500) return "error";
    return "";
  };

  return (
    <div className={`${styles.toast} ${styles[getColor()]}`}>
      <strong>{status}</strong> - {message}
    </div>
  );
}