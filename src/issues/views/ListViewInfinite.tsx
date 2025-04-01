import { useState } from "react";
import { LoadinSpinner } from "../../components";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../hooks";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels,
  });

  const handleChangeState = (newState: State) => {
    setState(newState);
  };

  const handleSelectLabels = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const issuesData = issuesQuery.data?.pages.flat() ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <div className="flex justify-center items-center">
            <LoadinSpinner />
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-2">
            <IssueList
              issues={issuesData}
              handleChangeState={handleChangeState}
              state={state}
            />
            <button
              onClick={() => issuesQuery.fetchNextPage()}
              className={`max-w-[250px] mx-auto py-2 px-8 bg-slate-700  hover:bg-blue-600 text-white  rounded-md`}
            >
              {issuesQuery.isLoading ? "Loading..." : "Siguiente"}
            </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          handleSelectLabels={handleSelectLabels}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
