import { LoadinSpinner } from "../../components";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const { data, isLoading, error } = useLabels();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadinSpinner />
      </div>
    );
  }

  if (error) return <div>Error {error.message}</div>;

  if (data)
    return (
      <>
        <div className="flex gap-2 flex-wrap lg:justify-center">
          {data.map((label) => (
            <span
              key={label.url}
              className="animate-fadeIn px-2 py-1 border rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              style={{
                border: `1px solid ${label.color}`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </>
    );
};
