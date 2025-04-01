import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { State } from "../interfaces";
import { getIssues } from "../services/issues.service";

type UseIssuesProps = {
  state: State;
  selectedLabels: string[];
};

export const useIssues = ({
  state = State.All,
  selectedLabels,
}: UseIssuesProps) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues({ state, selectedLabels, page }),
    staleTime: 1000 * 60 * 4, // 4 minutos
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return {
    issuesQuery,
    nextPage,
    prevPage,
    page,
  };
};
