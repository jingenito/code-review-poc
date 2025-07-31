import axios, { AxiosInstance, AxiosError } from "axios";
import { inject, injectable } from "inversify";
import { ILogger } from "./LoggerService";
import TYPES from "./types";

export interface IGitService {
  listRepos(workspace: string): Promise<unknown>;
  listPullRequests(workspace: string, repoSlug: string): Promise<unknown>;
  listPullRequestDiffs(workspace: string, repoSlug: string, prId: number): Promise<unknown>;
}

@injectable()
export class BitbucketService implements IGitService {
  private readonly http: AxiosInstance;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    /** token is bound in DI container */
    @inject("BITBUCKET_TOKEN") private token: string
  ) {
    this.http = axios.create({
      baseURL: "https://api.bitbucket.org/2.0",
      headers: { Authorization: `Bearer ${token}` },
      timeout: 15_000,
    });
  }

  async listRepos(workspace: string) {
    try {
      const { data } = await this.http.get(`/repositories/${workspace}`);
      return data;
    } catch (error) {
      this.handleApiError(error, `Failed to list repos for workspace ${workspace}`);
    }
  }

  async listPullRequests(workspace: string, repoSlug: string) {
    try {
      const { data } = await this.http.get(
        `/repositories/${workspace}/${repoSlug}/pullrequests`
      );
      return data;
    } catch (error) {
      this.handleApiError(
        error,
        `Failed to list PRs for ${workspace}/${repoSlug}`
      );
    }
  }

  async listPullRequestDiffs(workspace: string, repoSlug: string, prId: number) {
    try {
      const { data } = await this.http.get(
        `/repositories/${workspace}/${repoSlug}/pullrequests/${prId}/diff`
      );
      return data;
    } catch (error) {
      this.handleApiError(
        error,
        `Failed to get diff for PR #${prId} in ${workspace}/${repoSlug}`
      );
    }
  }

  // ——— private helpers ———
  private handleApiError(error: unknown, context: string): never {
    if (isAxiosError(error)) {
      const e = error as AxiosError<{ error?: { message?: string } }>;
      const status = e.response?.status ?? "N/A";
      const msg = e.response?.data?.error?.message ?? e.message;
      this.logger.error(`${context} – status ${status}: ${msg}`);
    } else {
      this.logger.error(`${context} – unexpected:`, error);
    }
    throw new Error(context);
  }
}

// type guard
function isAxiosError(val: unknown): val is AxiosError {
  return (
    typeof val === "object" &&
    val !== null &&
    (val as AxiosError).isAxiosError === true
  );
}
