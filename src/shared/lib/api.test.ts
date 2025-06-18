import { describe, it, expect } from "vitest";
import { searchUsers } from "./api";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);
describe("searchUsers API Function", () => {
  it("should search users successfully and return up to 5 users", async () => {
    const mockResponse = {
      items: [
        {
          id: 1,
          login: "octocat",
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
          type: "User",
        },
        {
          id: 2,
          login: "octocatsecond",
          avatar_url: "https://github.com/images/error/octocatsecond.gif",
          type: "User",
        },
        {
          id: 3,
          login: "octocatthird",
          avatar_url: "https://github.com/images/error/octocatthird.gif",
          type: "User",
        },
      ],
      total_count: 100,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await searchUsers("octocat");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      users: mockResponse.items,
      totalCount: 100,
      hasMore: false,
    });
  });
});
