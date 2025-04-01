import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../helpers/time";
import { IssueResponse, State } from "../interfaces";

type IssueItemProps = {
  issue: IssueResponse;
};

export const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // const prefetchData = () => {
  //   queryClient.prefetchQuery({
  //     queryKey: ["issue", issue.number],
  //     queryFn: () => getIssue(issue.number),
  //     staleTime: 1000 * 60, // 1 min
  //   });
  // };

  const presetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  };

  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Open ? (
        <FiCheckCircle size={30} color="green" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <button
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline hover:cursor-pointer text-left"
        >
          {issue.title}
        </button>
        <span className="text-gray-500">
          #{issue.id.toString().slice(0, 6)} opened{" "}
          {timeSince(issue.created_at.toString())} by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className="flex flex-wrap gap-1.5">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 bg-gray-800 text-white rounded-full text-xs font-semibold"
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
