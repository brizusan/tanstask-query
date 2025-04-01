import { IssueResponse, State } from "../interfaces";
import { IssueItem } from "./IssueItem";

type IssueListProps = {
  handleChangeState: (newState: State) => void;
  issues: IssueResponse[];
  state: State;
};

export const IssueList = ({
  issues,
  handleChangeState,
  state,
}: IssueListProps) => {
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
        {issues?.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
