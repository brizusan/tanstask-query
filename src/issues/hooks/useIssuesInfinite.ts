import { useInfiniteQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../services/issues.service";

type UseIssuesProps = {
  state: State;
  selectedLabels: string[];
};

export const useIssuesInfinite = ({
  state = State.All,
  selectedLabels,
}: UseIssuesProps) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      return getIssues({ state, selectedLabels, page: pageParam });
    },
    staleTime: 1000 * 60, // 1 minutos
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
    // getPreviousPageParam: (lastPage) => lastPage.previousPage,
  });

  return {
    issuesQuery,
  };
};
