import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ title, description, status = "success" }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, status }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const getColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-700 text-white";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-6 h-6" />;
      case "error":
        return <XCircle className="w-6 h-6" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-5 right-5 z-50 space-y-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 p-4 rounded-xl shadow-xl ${getColor(
                toast.status
              )}`}
            >
              <div>{getIcon(toast.status)}</div>

              <div>
                <p className="font-semibold text-lg">{toast.title}</p>
                <p className="text-sm opacity-90">{toast.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

// Usage Example
// const { showToast } = useToast();
// showToast({title:"Upload Successful", description:"Your image was uploaded.", status:"success"});
