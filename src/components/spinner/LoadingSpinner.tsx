import { FiRefreshCcw } from "react-icons/fi";

export const LoadinSpinner = () => {
  return (
    <div className="loading">
      <div className="animate-spin">
        <FiRefreshCcw size={24} color="#fff" />
      </div>
    </div>
  );
};
