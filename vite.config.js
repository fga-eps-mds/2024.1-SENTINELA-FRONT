import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: {
        src: "/src",
      },
    },
    base: "/", // Ensure this is set for correct asset paths
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          entryFileNames: `[name].[hash].js`,
          chunkFileNames: `[name].[hash].js`,
          assetFileNames: `[name].[hash].[ext]`,
        },
      },
    },
  });
};
