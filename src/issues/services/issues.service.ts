import { isAxiosError } from "axios";
import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { IssueResponse, State } from "../interfaces";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const getIssues = async ({
  state,
  selectedLabels,
}: Props): Promise<IssueResponse[]> => {
  const params = new URLSearchParams({ state });
  if (selectedLabels.length > 0)
    params.append("labels", selectedLabels.join(","));

  try {
    const url = `/issues?per_page=10`;
    const { data } = await githubApi.get<IssueResponse[]>(url, { params });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const getIssue = async (issueID: number): Promise<IssueResponse> => {
  try {
    const url = `/issues/${issueID}`;
    const { data } = await githubApi.get<IssueResponse>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const getIssueComments = async (
  issueID: number
): Promise<IssueResponse[]> => {
  try {
    await sleep(1500);
    const url = `/issues/${issueID}/comments`;
    const { data } = await githubApi.get<IssueResponse[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
