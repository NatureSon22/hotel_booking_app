import { useEffect } from "react";
import useToastStore from "../context/toastStore";

const Toast = () => {
  const { message, show, type, hideToast } = useToastStore((state) => state);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, hideToast]);

  const colorStyle =
    type === "SUCCESS"
      ? "border-green-500 text-green-700"
      : "border-red-500 text-red-700";

  const animationStyle = show
    ? "transform right-5 translate-x-0 sm:right-10"
    : "transform right-0 translate-x-full";

  return (
    <div
      className={`fixed top-7 sm:top-10 px-7 py-4 bg-white text-[0.9rem] rounded-sm border-t-8 shadow-lg ${colorStyle} ${animationStyle} transition-transform duration-200 ease-in-out`}
    >
      {message}
    </div>
  );
};

export default Toast;
