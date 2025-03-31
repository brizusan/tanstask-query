import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../services/issues.service";

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 4, // 4 minutos
  });

  return {
    issuesQuery,
  };
};
