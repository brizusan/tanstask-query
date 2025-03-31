import { isAxiosError } from "axios";
import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { GithubLabel } from "../interfaces";

export const getLabels = async (): Promise<GithubLabel[]> => {
  try {
    await sleep(1500);
    const url = "/labels?per_page=15";
    const { data } = await githubApi.get<GithubLabel[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
