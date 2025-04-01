import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleSelectLabels = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        <IssueList selectedLabels={selectedLabels} />
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
