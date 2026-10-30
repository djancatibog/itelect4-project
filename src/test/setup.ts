// ===== GT6: runs before every test file ================================
// vite.config.ts names this file in test.setupFiles. It is never
// imported by the app itself.
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds checks such as toBeInTheDocument() and toHaveTextContent() to
// expect(), and tells TypeScript they exist.
import "@testing-library/jest-dom/vitest";

// render() puts each component into the same pretend page. Without
// this, the second test would still see what the first one rendered.
afterEach(() => {
  cleanup();
});