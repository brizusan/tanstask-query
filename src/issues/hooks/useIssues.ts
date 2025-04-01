import { useQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../services/issues.service";

type UseIssuesProps = {
  state: State;
  selectedLabels: string[];
};

export const useIssues = ({ state, selectedLabels }: UseIssuesProps) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels }],
    queryFn: () => getIssues({ state, selectedLabels }),
    staleTime: 1000 * 60 * 4, // 4 minutos
  });

  return {
    issuesQuery,
  };
};
