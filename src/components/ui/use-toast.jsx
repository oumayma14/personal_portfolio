import { useState, useCallback } from "react";

let toastHandler;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  toastHandler = addToast;
  return { toasts };
}

export function toast(message, duration) {
  if (!toastHandler) {
    console.warn("Toast handler not initialized yet");
    return;
  }
  toastHandler(message, duration);
}
