import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

vi.mock("swr/infinite", () => ({
  default: vi.fn(),
}));
vi.mock("swr", () => ({
  default: vi.fn(),
}));

const mockUseSWRInfinite = useSWRInfinite as any;
const mockUseSWR = useSWR as any;

describe("App Component - Comprehensive Tests", () => {
  const defaultSWRReturn = {
    data: undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    size: 1,
    setSize: vi.fn(),
    mutate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSWRInfinite.mockReturnValue(defaultSWRReturn);
    mockUseSWR.mockReturnValue(defaultSWRReturn);
  });

  describe("Initial Render", () => {
    it("should render all essential elements", () => {
      const { getByText, getByPlaceholderText, getByRole } = render(<App />);

      expect(getByText("GitHub User Search")).toBeInTheDocument();
      expect(getByPlaceholderText("Enter username")).toBeInTheDocument();
      expect(getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    it("should show initial not found message", () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId("not-found")).toBeInTheDocument();
      expect(getByTestId("not-found-text")).toHaveTextContent(
        "Search for GitHub users to get started"
      );
    });

    it("should have search button disabled initially", () => {
      const { getByTestId } = render(<App />);
      const btn = getByTestId("submit-btn");

      expect(btn).toBeDisabled();
    });
  });

  describe("Search Results Display", async () => {
    it("should call loadMore when load more button is clicked", async () => {
      const user = userEvent.setup();
      const mockSetSize = vi.fn();
      const mockUsers = [{ id: 1, login: "octocat", avatar_url: "url1" }];

      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        data: [{ users: mockUsers, hasMore: true }],
        setSize: mockSetSize,
        size: 1,
      });

      const { getByTestId, getByPlaceholderText } = render(<App />);

      const searchInput = getByPlaceholderText("Enter username");

      await user.type(searchInput, "test");
      const btn = getByTestId("submit-btn");

      await user.click(btn);

      expect(mockSetSize).toHaveBeenCalledWith(1);

      const loadMoreButton = getByTestId("load-more-btn");

      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        data: [{ users: mockUsers, hasMore: true }],
        setSize: mockSetSize,
        size: 2,
      });
      await user.click(loadMoreButton);

      expect(mockSetSize).toHaveBeenCalledWith(2);
    });

    it("should show repository", async () => {
      const mockUsers = [
        { id: 1, login: "user1", avatar_url: "url1" },
        { id: 2, login: "user2", avatar_url: "url2" },
      ];

      const mockRepos = [
        {
          id: 101,
          name: "Hello-World",
          description: "My first repository",
          updated_at: "2025-06-17T07:00:17Z",
          stargazers_count: 80,
          language: "Typescript",
        },
        {
          id: 102,
          name: "Spoon-Knife",
          description: "Test repository",
          updated_at: "2025-06-17T07:00:17Z",
          stargazers_count: 150,
          language: "Typescript",
        },
      ];

      const user = userEvent.setup();
      const mockSetSize = vi.fn();

      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        data: [{ users: mockUsers, hasMore: false }],
        isValidating: false,
        isLoading: false,
        size: 1,
        setSize: mockSetSize,
      });
      mockUseSWR.mockReturnValue({
        ...defaultSWRReturn,
        data: mockRepos,
        isValidating: false,
        isLoading: false,
      });

      const { getByPlaceholderText, getByTestId } = render(<App />);

      const searchInput = getByPlaceholderText("Enter username");

      await user.type(searchInput, "user1");
      const btn = getByTestId("submit-btn");

      await user.click(btn);

      const repoBtn = getByTestId("user1-trigger-repo-btn");
      await waitFor(() => {
        expect(repoBtn).toBeInTheDocument();
      });

      await user.click(repoBtn);

      const refreshBtn = getByTestId("refresh-btn");
      expect(refreshBtn).toBeInTheDocument();
    });
  });

  describe("Form Integration", () => {
    it("should handle form submission correctly", async () => {
      const user = userEvent.setup();
      const mockSetSize = vi.fn();

      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        setSize: mockSetSize,
      });

      const { getByPlaceholderText, getByTestId } = render(<App />);

      const searchInput = getByPlaceholderText("Enter username");

      await user.type(searchInput, "test");
      const btn = getByTestId("submit-btn");

      await user.click(btn);

      expect(mockSetSize).toHaveBeenCalledWith(1);
    });
  });

  describe("Loading and Error States Integration", () => {
    it("should show loading state during initial search", () => {
      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        isLoading: true,
        size: 1,
      });

      const { getByRole, getByPlaceholderText } = render(<App />);

      const searchButton = getByRole("button", { name: /searching/i });
      const searchInput = getByPlaceholderText("Enter username");

      expect(searchButton).toBeDisabled();
      expect(searchButton).toHaveTextContent("Searching...");
      expect(searchInput).toBeDisabled();
    });

    it("should show loading state during pagination", () => {
      const mockUsers = [{ id: 1, login: "user1", avatar_url: "url1" }];

      mockUseSWRInfinite.mockReturnValue({
        ...defaultSWRReturn,
        data: [{ users: mockUsers, hasMore: true }],
        isValidating: true,
        size: 2,
      });

      const { getByTestId, getByText } = render(<App />);

      expect(getByText("user1")).toBeInTheDocument();

      const loadMoreButton = getByTestId("load-more-btn");
      expect(loadMoreButton).toBeDisabled();
    });
  });
});
