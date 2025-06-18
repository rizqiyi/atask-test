import "@testing-library/jest-dom/vitest";
import { vi, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";

import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
expect.extend(matchers);

vi.stubEnv("VITE_GITHUB_TOKEN", "test-token-123");

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});
