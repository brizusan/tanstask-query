import { useState } from "react";
import { LoadinSpinner } from "../../components";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interfaces";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery, nextPage, prevPage, page } = useIssues({
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

  const issuesData = issuesQuery.data!;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <div className="flex justify-center items-center">
            <LoadinSpinner />
          </div>
        ) : (
          <IssueList
            issues={issuesData}
            handleChangeState={handleChangeState}
            state={state}
          />
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={prevPage}
            className={`py-2 px-8 bg-blue-500  font-medium hover:bg-blue-600 text-white  rounded-md ${
              page === 1 ? "opacity-0" : ""
            }`}
          >
            Anterior
          </button>
          {`pagina ${page}`}
          <button
            onClick={nextPage}
            className="py-2 px-8 bg-blue-500 font-medium  hover:bg-blue-600 text-white  rounded-md"
          >
            Siguiente
          </button>
        </div>
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
