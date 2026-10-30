import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  // npm run dev and npm run build skip this block. npm test reads the
  // whole file -- the plugins and the "@" alias too -- and then this.
  test: {
    // A pretend browser page inside Node, so render() has a document.
    environment: "jsdom",
    // Runs before every test file.
    setupFiles: ["./src/test/setup.ts"],
    // client.ts throws at import if VITE_API_URL is missing, and
    // LoginPage imports client.ts. The tests never call this address,
    // so a fixed value means they need no .env, on your laptop or on
    // GitHub.
    env: { VITE_API_URL: "http://localhost:4000" },
  },
});