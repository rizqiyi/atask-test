const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env?.VITE_GITHUB_TOKEN;

const githubApi = async (endpoint: string, params = {}) => {
  const url = new URL(`${GITHUB_API_BASE}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value as string);
  });

  const headers = {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
};

export const searchUsers = async (
  query: string,
  page: number = 1,
  perPage = 5
) => {
  const data = await githubApi("/search/users", {
    q: query,
    per_page: perPage,
    page: page,
  });

  return {
    users: data.items,
    totalCount: data.total_count,
    hasMore: data.items.length === perPage,
  };
};

export const getUserRepositories = async (username: string) => {
  return await githubApi(`/users/${username}/repos`, {
    sort: "updated",
    direction: "desc",
    page: 1,
  });
};
