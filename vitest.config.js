import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const reporter = process.env.VITEST_REPORTER;

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: { 
      provider: "v8",
      reporter: "lcov" },
    environment: "jsdom",
    reporters: reporter ? [[reporter, {outputFile: "coverage/coverage.xml"}]] : [],
    outputFile: "coverage/coverage.xml",
    testTimeout: 7500,
  },
});
