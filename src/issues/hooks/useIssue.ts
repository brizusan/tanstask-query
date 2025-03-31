import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../services/issues.service";

export const useIssue = ({ issueID }: { issueID: number }) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueID],
    queryFn: () => getIssue(issueID),
  });

  const commentsQuery = useQuery({
    queryKey: ["issue", issueID, "comments"],
    queryFn: () => getIssueComments(issueID),
    enabled: issueQuery.isSuccess,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
