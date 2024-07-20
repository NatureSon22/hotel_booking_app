import { create } from "zustand";

type ToastType = "SUCCESS" | "ERROR";

type ToastStoreType = {
  show: boolean;
  message: string | null;
  type: ToastType;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
};

const ToastStore = create<ToastStoreType>((set) => ({
  show: false,
  message: null,
  type: "SUCCESS",
  showToast: (message, type) => {
    set(() => ({
      show: true,
      message: message,
      type: type,
    }));
  },
  hideToast: () => {
    set(() => ({
      show: false,
    }));

    setTimeout(() => {
      set(() => ({
        message: null,
        type: "SUCCESS",
      }));
    }, 500);
  },
}));

export default ToastStore;
