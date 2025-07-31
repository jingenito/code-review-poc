interface IGitService {
    listRepos(workspace: string): Promise<any>;
    listPullRequests(workspace: string, repoSlug: string): Promise<any>;
    listPullRequestDiffs(workspace: string, repoSlug: string, prId: number): Promise<any>;
}

export default IGitService;