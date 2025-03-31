import { LoadinSpinner } from "../../components";
import { useIssues } from "../hooks";
import { IssueItem } from "./IssueItem";

export const IssueList = () => {
  const { issuesQuery } = useIssues();

  if (issuesQuery.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadinSpinner />
      </div>
    );
  }

  if (issuesQuery.data)
    return (
      <>
        {/* Botones de All, Open, Closed */}
        <div className="flex gap-4">
          <button className="btn active">All</button>
          <button className="btn">Open</button>
          <button className="btn">Closed</button>
        </div>

        {/* Lista de issuesQuery */}
        <div className="mt-4">
          {issuesQuery.data?.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </div>
      </>
    );
};
