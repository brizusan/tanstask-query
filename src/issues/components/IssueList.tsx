import { useState } from "react";
import { LoadinSpinner } from "../../components";
import { useIssues } from "../hooks";
import { State } from "../interfaces";
import { IssueItem } from "./IssueItem";

type IssueListProps = {
  selectedLabels: string[];
};

export const IssueList = ({ selectedLabels }: IssueListProps) => {
  const [state, setState] = useState<State>(State.All);
  const { issuesQuery } = useIssues({ state, selectedLabels });

  const handleChangeState = (newState: State) => {
    setState(newState);
  };

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
          <button
            onClick={() => handleChangeState(State.All)}
            className={`btn ${state === State.All ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => handleChangeState(State.Open)}
            className={`btn ${state === State.Open ? "active" : ""}`}
          >
            Open
          </button>
          <button
            onClick={() => handleChangeState(State.Closed)}
            className={`btn ${state === State.Closed ? "active" : ""}`}
          >
            Closed
          </button>
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
